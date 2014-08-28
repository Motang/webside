package com.motang.webside.integration.service;

import java.net.MalformedURLException;

import org.junit.Assert;
import org.junit.Test;

import com.caucho.hessian.client.HessianProxyFactory;
import com.motang.webside.service.UserHessian;

public class UserHessianServiceTest {

	@Test
	public void testGetUserServiceName() {
		String urlName = "http://localhost:8080/webside/hessian/UserHessianRemote";
		HessianProxyFactory factory = new HessianProxyFactory();
		try {
			UserHessian userHessian = (UserHessian) factory.create(UserHessian.class, urlName);
			Assert.assertEquals("test", userHessian.getServiceName());

			userHessian.setServiceName("morly");
			Assert.assertEquals("morly", userHessian.getServiceName());

		} catch (MalformedURLException e) {
			Assert.fail(e.getMessage());
		}
	}
}
