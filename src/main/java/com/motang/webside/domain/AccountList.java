package com.motang.webside.domain;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "accountList")
public class AccountList {
	private List<Account> account;

	public List<Account> getAccount() {
		return this.account;
	}

	public void setAccount(List<Account> account) {
		this.account = account;
	}

}
