package com.motang.webside.unit.service;

import org.junit.Assert;
import org.junit.Test;

import com.motang.webside.service.UserHessian;
import com.motang.webside.service.impl.UserHessianImpl;

public class UserHessianServiceTest {

	@Test
	public void testGetUserServiceName() {
		UserHessian userHessian = new UserHessianImpl();
		Assert.assertEquals("test", userHessian.getServiceName());

		userHessian.setServiceName("morly");
		Assert.assertEquals("morly", userHessian.getServiceName());

	}
}
