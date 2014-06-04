package com.motang.webside.domain;

import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

public class LoginUserModel implements Serializable {

	private static final long serialVersionUID = -561630575511879611L;
	
	@NotBlank(message="{loginUserModel.username.error.message}")
	private String username;
	@NotBlank(message="{loginUserModel.password.error.message}")
	private String password;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createDate;
	
	@DateTimeFormat(pattern="yyyy-MM-dd hh:mm:ss.SSS")
	private Date updateDate;
	
	@DateTimeFormat(pattern="yyyy-MM-dd hh:mm:ss")
	private Date updateTime;
	
	@DateTimeFormat(pattern="hh:mm:ss")
	private Date time;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}

}
