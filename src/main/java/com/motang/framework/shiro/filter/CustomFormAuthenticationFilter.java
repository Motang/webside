/**
 * Copyright (c) 2005-2012 https://github.com/zhangkaitao
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.motang.framework.shiro.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 基于几点修改：
 * 1、onLoginFailure 时 把异常添加到request attribute中 而不是异常类名
 * 2、登录成功时：成功页面重定向：
 * 2.1、如果前一个页面是登录页面，-->2.3
 * 2.2、如果有SavedRequest 则返回到SavedRequest
 * 2.3、否则根据当前登录的用户决定返回到管理员首页/前台首页
 * <p/>
 * <p>User: Zhang Kaitao
 * <p>Date: 13-3-19 下午2:11
 * <p>Version: 1.0
 */
public class CustomFormAuthenticationFilter extends FormAuthenticationFilter {
	private Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 默认的成功地址
     */
    private String defaultSuccessUrl;
    /**
     * 管理员默认的成功地址
     */
    private String adminDefaultSuccessUrl;

    public void setDefaultSuccessUrl(String defaultSuccessUrl) {
        this.defaultSuccessUrl = defaultSuccessUrl;
    }

    public void setAdminDefaultSuccessUrl(String adminDefaultSuccessUrl) {
        this.adminDefaultSuccessUrl = adminDefaultSuccessUrl;
    }

    public String getDefaultSuccessUrl() {
        return defaultSuccessUrl;
    }

    public String getAdminDefaultSuccessUrl() {
        return adminDefaultSuccessUrl;
    }
    
    protected void setFailureAttribute(ServletRequest request, AuthenticationException ae) {
    	request.setAttribute(getFailureKeyAttribute(), ae);
    }
    
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
    	logger.info("CustomFormAuthenticationFilter invoke isAccessAllowed...");
    	return super.isAccessAllowed(request, response, mappedValue);
    }
    
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception{
    	logger.info("CustomFormAuthenticationFilter invoke onAccessDenied<<<");
    	return super.onAccessDenied(request, response);
    }
    
    /**
     * 根据用户选择成功地址
     *
     * @return
     */
    @Override
    public String getSuccessUrl() {
    	Subject subject = SecurityUtils.getSubject();
        if (subject.hasRole("admin")) {
            return getAdminDefaultSuccessUrl();
        }
        return getDefaultSuccessUrl();
    }
}
