package com.motang.webside.service.impl;

import com.motang.webside.service.UserHessian;

public class UserHessianImpl implements UserHessian {
	private String serviceName = "test";

	public String getServiceName() {
		return this.serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

}
