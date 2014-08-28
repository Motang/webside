package com.motang.webside.web;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map.Entry;
import java.util.Set;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.motang.framework.util.CaptchaUtils;
import com.motang.framework.util.GlobalStatic;
import com.motang.framework.web.BaseController;
import com.motang.webside.entity.User;

@Controller
public class LoginController extends BaseController {

	 @Autowired
	 private MessageSource messageSource;
	/**
	 * 首页的映射
	 *
	 * @param model
	 * @return
	 * @throws Exception
	 */
//	@RequestMapping(value = "/index")
//	public String index(Model model) throws Exception {
//		return "/index";
//	}
//
//	@RequestMapping(value = "/login", method = RequestMethod.GET)
//	public String login(Model model) throws Exception {
//		if (SecurityUtils.getSubject().isAuthenticated()) {
//			return "redirect:/index";
//		}
//		// 默认赋值message,避免freemarker尝试从session取值,造成异常
//		model.addAttribute("message", "");
//
//		return "/login";
//	}

	    //spring3.2.2 bug see  http://jinnianshilongnian.iteye.com/blog/1831408
	    @RequestMapping(value = {"/{login:login;?.*}"})
	    public String loginForm(HttpServletRequest request, ModelMap model) {

	        //表示退出
	        if (!StringUtils.isEmpty(request.getParameter("logout"))) {
	            model.addAttribute(GlobalStatic.MESSAGE, this.messageSource.getMessage("user.logout.success", null, null));
	        }

	        //表示用户删除了 @see org.apache.shiro.web.filter.user.SysUserFilter
	        if (!StringUtils.isEmpty(request.getParameter("notfound"))) {
	            model.addAttribute(GlobalStatic.ERROR, this.messageSource.getMessage("user.notfound", null, null));
	        }

	        //表示用户被管理员强制退出
	        if (!StringUtils.isEmpty(request.getParameter("forcelogout"))) {
	            model.addAttribute(GlobalStatic.ERROR, this.messageSource.getMessage("user.forcelogout", null, null));
	        }

	        //表示用户输入的验证码错误
	        if (!StringUtils.isEmpty(request.getParameter("jcaptchaError"))) {
	            model.addAttribute(GlobalStatic.ERROR, this.messageSource.getMessage("jcaptcha.validate.error", null, null));
	        }


	        //表示用户锁定了 @see org.apache.shiro.web.filter.user.SysUserFilter
	        if (!StringUtils.isEmpty(request.getParameter("blocked"))) {
	            User user = (User) request.getAttribute(GlobalStatic.CURRENT_USER);
	            ///String reason = userStatusHistoryService.getLastReason(user);
	            model.addAttribute(GlobalStatic.ERROR, this.messageSource.getMessage("user.blocked", new Object[]{"Cannot login"}, null));
	        }

	        if (!StringUtils.isEmpty(request.getParameter("unknown"))) {
	            model.addAttribute(GlobalStatic.ERROR, this.messageSource.getMessage("user.unknown.error", null, null));
	        }

	        //登录失败了 提取错误消息
	        Exception shiroLoginFailureEx = (Exception) request.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
	        if (shiroLoginFailureEx != null) {
	            model.addAttribute(GlobalStatic.ERROR, shiroLoginFailureEx.getMessage());
	        }

	        //如果用户直接到登录页面 先退出一下
	        //原因：isAccessAllowed实现是subject.isAuthenticated()---->即如果用户验证通过 就允许访问
	        // 这样会导致登录一直死循环
	        Subject subject = SecurityUtils.getSubject();
	        if (subject != null && subject.isAuthenticated()) {
	            subject.logout();
	        }


	        //如果同时存在错误消息 和 普通消息  只保留错误消息
	        if (model.containsAttribute(GlobalStatic.ERROR)) {
	            model.remove(GlobalStatic.MESSAGE);
	        }

	        Set<Entry<String, Object>> entrySet = model.entrySet();
	        for (Entry<String, Object> entry : entrySet) {
				System.out.printf("<<<<=======key=%s, value=%s \n",entry.getKey(), entry.getValue());
			}

	        return "login";
	    }
//
//	@RequestMapping(value = "/login", method = RequestMethod.POST)
//	public String loginPost(User currUser, HttpSession session, Model model,
//			HttpServletRequest request) throws Exception {
//		Subject user = SecurityUtils.getSubject();
//		String code = (String) session.getAttribute(GlobalStatic.DEFAULT_CAPTCHA_PARAM);
//		if (StringUtils.isNotBlank(code)) {
//			code = code.toLowerCase().toString();
//		}
//		String submitCode = WebUtils.getCleanParam(request, GlobalStatic.DEFAULT_CAPTCHA_PARAM);
//		if (StringUtils.isNotBlank(submitCode)) {
//			submitCode = submitCode.toLowerCase().toString();
//		}
//		if (StringUtils.isBlank(submitCode) || StringUtils.isBlank(code)
//				|| !code.equals(submitCode)) {
//			model.addAttribute("message", "验证码错误!");
//			return "/login";
//		}
//
//		UsernamePasswordToken token = new UsernamePasswordToken(currUser.getAccount(),
//				currUser.getPassword());
//
//		String rememberme = request.getParameter("rememberme");
//		if (StringUtils.isNotBlank(rememberme)) {
//			token.setRememberMe(true);
//		} else {
//			token.setRememberMe(false);
//		}
//
//		try {
//			// 会调用 shiroDbRealm 的认证方法
//			// org.springrain.frame.shiro.ShiroDbRealm.doGetAuthenticationInfo(AuthenticationToken)
//			user.login(token);
//		} catch (UnknownAccountException uae) {
//			model.addAttribute("message", "账号不存在!");
//			return "/login";
//		} catch (IncorrectCredentialsException ice) {
//			model.addAttribute("message", "密码错误!");
//			return "/login";
//		} catch (LockedAccountException lae) {
//			model.addAttribute("message", "账号被锁定!");
//			return "/login";
//		} catch (Exception e) {
//			model.addAttribute("message", "未知错误,请联系管理员.");
//			return "/login";
//		}
//
//		// String sessionId = session.getId();
//
//		// Cache<Object, Object> cache =
//		// shiroCacheManager.getCache(GlobalStatic.authenticationCacheName);
//		// cache.put(GlobalStatic.authenticationCacheName+"-"+currUser.getAccount(),
//		// sessionId);
//
//		/*
//		 * Cache<String, Object> cache =
//		 * shiroCacheManager.getCache(GlobalStatic.shiroActiveSessionCacheName);
//		 * Serializable oldSessionId = (Serializable)
//		 * cache.get(currUser.getAccount()); if(oldSessionId!=null){ Subject
//		 * subject=new Subject.Builder().sessionId(oldSessionId).buildSubject();
//		 * subject.logout(); } cache.put(currUser.getAccount(),
//		 * session.getId());
//		 */
//
//		return "redirect:/index";
//	}

//	/**
//	 * 没有权限
//	 *
//	 * @param model
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/unauth")
//	public String unauth(Model model) throws Exception {
//		if (SecurityUtils.getSubject().isAuthenticated() == false) {
//			return "redirect:/login";
//		}
//		return "/unauth";
//
//	}

//	/**
//	 * 退出
//	 *
//	 * @param request
//	 */
//	@RequestMapping(value = "/logout")
//	public void logout(HttpServletRequest request) {
//		Subject subject = SecurityUtils.getSubject();
//		if (subject != null) {
//			subject.logout();
//		}
//		// request.getSession().invalidate();
//	}

//	@RequestMapping(value = "/mobilelogin")
//	public String mobilelogin(Model model) throws Exception {
//		return "/mobilelogin";
//	}

	/**
	 * 生成验证码
	 *
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/getCaptcha")
	public void getCaptcha(HttpSession session, HttpServletResponse response) throws IOException {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);

		CaptchaUtils tool = new CaptchaUtils();
		StringBuffer code = new StringBuffer();
		BufferedImage image = tool.genRandomCodeImage(code);
		session.setAttribute(GlobalStatic.DEFAULT_CAPTCHA_PARAM, code.toString());

		// 将内存中的图片通过流动形式输出到客户端
		ImageIO.write(image, "JPEG", response.getOutputStream());
		return;
	}

}
