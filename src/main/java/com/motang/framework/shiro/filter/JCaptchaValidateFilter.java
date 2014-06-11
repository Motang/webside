/**
 * Copyright (c) 2005-2012 https://github.com/zhangkaitao
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.motang.framework.shiro.filter;

import java.io.IOException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.motang.framework.util.CaptchaUtils;
import com.motang.framework.util.GlobalStatic;

/**
 * 验证码过滤器
 * <p>User: Zhang Kaitao
 * <p>Date: 13-3-22 下午4:01
 * <p>Version: 1.0
 */
public class JCaptchaValidateFilter extends AccessControlFilter {
	
	private Logger logger = LoggerFactory.getLogger(getClass());

    private boolean jcaptchaEbabled = true;

    private String jcaptchaParam = GlobalStatic.DEFAULT_CAPTCHA_PARAM;

    private String jcapatchaErrorUrl;

    /**
     * 是否开启jcaptcha
     *
     * @param jcaptchaEbabled
     */
    public void setJcaptchaEbabled(boolean jcaptchaEbabled) {
        this.jcaptchaEbabled = jcaptchaEbabled;
    }

    /**
     * 前台传入的验证码
     *
     * @param jcaptchaParam
     */
    public void setJcaptchaParam(String jcaptchaParam) {
        this.jcaptchaParam = jcaptchaParam;
    }

    public void setJcapatchaErrorUrl(String jcapatchaErrorUrl) {
        this.jcapatchaErrorUrl = jcapatchaErrorUrl;
    }

    public String getJcapatchaErrorUrl() {
        return jcapatchaErrorUrl;
    }

    @Override
    public boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        request.setAttribute("jcaptchaEbabled", jcaptchaEbabled);
        return super.onPreHandle(request, response, mappedValue);
    }

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
    	HttpServletRequest httpServletRequest = (HttpServletRequest) request;
    	logger.info("JCaptchaValidateFilter jcaptchaEbabled={}, method={}", jcaptchaEbabled, httpServletRequest.getMethod());
    	//验证码禁用 或不是表单提交 允许访问
        if (jcaptchaEbabled == false || !"post".equals(httpServletRequest.getMethod().toLowerCase())) {
            return true;
        }
        
    	return false;
    }


    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
    	HttpServletRequest httpServletRequest = (HttpServletRequest) request;
    	HttpSession session = httpServletRequest.getSession();
        
    	logger.info("JCaptchaValidateFilter invoke onAccessDenied<<<<>>");
        
		String code = (String) session.getAttribute(GlobalStatic.DEFAULT_CAPTCHA_PARAM);
		String submitCode = WebUtils.getCleanParam(request, jcaptchaParam);
		
        if (!CaptchaUtils.validateResponse(code, submitCode)) {
        	redirectToLogin(request, response);
        	return false;
        }
        
        return true;
    }


    protected void redirectToLogin(ServletRequest request, ServletResponse response) throws IOException {
        WebUtils.issueRedirect(request, response, getJcapatchaErrorUrl());
    }

}
