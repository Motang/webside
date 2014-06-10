package com.motang.framework.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.web.util.WebUtils;

public class CaptchaUtils {

	// 随机产生的字符串
	private static final String RANDOM_STRS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

	private static final String FONT_NAME = "Times New Roman";//字体
	private static final int FONT_SIZE = 24;//字体大小
	private int width = 85;// 图片宽
	private int height = 25;// 图片高
	private int lineNum = 155;// 干扰线数量
	private int strNum = 4;// 随机产生字符数量

	private Random random = new Random();



	/**
	 * 生成随机图片
	 */
	public BufferedImage genRandomCodeImage(StringBuffer randomCode) {
		// BufferedImage类是具有缓冲区的Image类
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		// 获取Graphics对象,便于对图像进行各种绘制操作
		Graphics g = image.getGraphics();
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		//g.setColor(new Color()); 
		//g.drawRect(0,0,width-1,height-1); 
		g.setColor(getRandColor(160, 200));

		// 绘制干扰线
		for (int i = 0; i <= lineNum; i++) {
			drowLine(g);
		}
		// 绘制随机字符
		g.setFont(new Font(FONT_NAME, Font.PLAIN, FONT_SIZE));
		
		for (int i = 0; i < strNum; i++) {
			randomCode.append(drowString(g, i));
		}
		g.dispose();
		return image;
	}

	/**
	 * 给定范围获得随机颜色
	 */
	private Color getRandColor(int fc, int bc) {
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	/**
	 * 绘制字符串
	 */
	private String drowString(Graphics g, int i) {
		g.setColor(new Color(20 + random.nextInt(110), 20 + random
				.nextInt(110), 20 + random.nextInt(110)));
		String rand = String.valueOf(getRandomString(random.nextInt(RANDOM_STRS
				.length())));
	//	g.translate(random.nextInt(3), random.nextInt(3));
		g.drawString(rand, 20 * i + 4, 19);
		return rand;
	}

	/**
	 * 绘制干扰线
	 */
	private void drowLine(Graphics g) {
		int x = random.nextInt(width);
		int y = random.nextInt(height);
		int x0 = random.nextInt(12);
		int y0 = random.nextInt(12);
		g.drawLine(x, y, x + x0, y + y0);
	}

	/**
	 * 获取随机的字符
	 */
	private String getRandomString(int num) {
		return String.valueOf(RANDOM_STRS.charAt(num));
	}

	public static void main(String[] args) {
		CaptchaUtils tool = new CaptchaUtils();
		StringBuffer code = new StringBuffer();
		BufferedImage image = tool.genRandomCodeImage(code);
		System.out.println(">>> random code =: " + code);
		try {
			// 将内存中的图片通过流动形式输出到客户端
			ImageIO.write(image, "JPEG", new FileOutputStream(new File(
					"random-code.jpg")));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public static boolean validateResponse(String code, String submitCode) {
		if (StringUtils.isNotBlank(code)) {
			code = code.toLowerCase().toString();
		}
		
		if (StringUtils.isNotBlank(submitCode)) {
			submitCode = submitCode.toLowerCase().toString();
		}
		
		if (StringUtils.isBlank(submitCode) || StringUtils.isBlank(code)
				|| !code.equals(submitCode)) {
			return false;
		}
		
		return true;
	}
}
