package com.motang.webside.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.motang.framework.entity.BaseEntity;
/**
 * TODO 在此加入类描述
 * @copyright {@link 9iu.org}
 * @author springrain<Auto generate>
 * @version  2013-07-06 16:03:00
 * @see org.springrain.demo.entity.User
 */
public class User  extends BaseEntity {

	private static final long serialVersionUID = 1L;

	//alias
	/*
	public static final String TABLE_ALIAS = "用户";
	public static final String ALIAS_ID = "编号";
	public static final String ALIAS_NAME = "姓名";
	public static final String ALIAS_WORKNO = "工号";
	public static final String ALIAS_ACCOUNT = "账号";
	public static final String ALIAS_PASSWORD = "密码";
	public static final String ALIAS_CARDNO = "身份证";
	public static final String ALIAS_AGE = "年龄";
	public static final String ALIAS_SEX = "性别";
	public static final String ALIAS_PHONE = "电话号码";
	public static final String ALIAS_MOBILE = "手机号码";
	public static final String ALIAS_EAMIL = "邮箱";
	public static final String ALIAS_ADDRESS = "地址";
	public static final String ALIAS_GRADEID = "级别";
	public static final String ALIAS_EDUNAME = "学历";
	public static final String ALIAS_ENTRYDATE = "入职日期";
	public static final String ALIAS_STARTDATE = "转正日期";
	public static final String ALIAS_ENDDATE = "离职日期";
	public static final String ALIAS_FIRENAME = "紧急联系人";
	public static final String ALIAS_FIREPHONE = "紧急联系电话";
	public static final String ALIAS_DESCRIPTION = "备注";
	public static final String ALIAS_STATE = "是否有效,是/否/离职";
    */
	//date formats
	//public static final String FORMAT_ENTRYDATE = DateUtils.DATETIME_FORMAT;
	//public static final String FORMAT_STARTDATE = DateUtils.DATETIME_FORMAT;
	//public static final String FORMAT_ENDDATE = DateUtils.DATETIME_FORMAT;

	//columns START
	/**
	 * 编号
	 */
	private java.lang.String id;
	/**
	 * 姓名
	 */
	private java.lang.String name;
	/**
	 * 工号
	 */
	private java.lang.String workno;
	/**
	 * 账号
	 */
	private java.lang.String account;
	/**
	 * 密码
	 */
	private java.lang.String password;
	/**
	 * 身份证
	 */
	private java.lang.String cardno;
	/**
	 * 年龄
	 */
	private java.lang.Integer age;
	/**
	 * 性别
	 */
	private java.lang.String sex;
	/**
	 * 电话号码
	 */
	private java.lang.String phone;
	/**
	 * 手机号码
	 */
	private java.lang.String mobile;
	/**
	 * 邮箱
	 */
	private java.lang.String email;
	/**
	 * 地址
	 */
	private java.lang.String address;
	/**
	 * 级别
	 */
	private java.lang.String gradeId;
	/**
	 * 学历
	 */
	private java.lang.String eduName;

	/**
	 * 紧急联系人
	 */
	private java.lang.String fireName;
	/**
	 * 紧急联系电话
	 */
	private java.lang.String firePhone;
	/**
	 * 备注
	 */
	private java.lang.String description;
	/**
	 * 是否有效,是/否/离职
	 */
	private java.lang.String state;
	//columns END 数据库字段结束

	private String roleIds;
	private String roleIdNames;
	private String gradeName;

	public java.lang.String getId() {
		return this.id;
	}

	public void setId(java.lang.String id) {
		this.id = id;
	}

	public java.lang.String getName() {
		return this.name;
	}

	public void setName(java.lang.String name) {
		this.name = name;
	}

	public java.lang.String getWorkno() {
		return this.workno;
	}

	public void setWorkno(java.lang.String workno) {
		this.workno = workno;
	}

	public java.lang.String getAccount() {
		return this.account;
	}

	public void setAccount(java.lang.String account) {
		this.account = account;
	}

	public java.lang.String getPassword() {
		return this.password;
	}

	public void setPassword(java.lang.String password) {
		this.password = password;
	}

	public java.lang.String getCardno() {
		return this.cardno;
	}

	public void setCardno(java.lang.String cardno) {
		this.cardno = cardno;
	}

	public java.lang.Integer getAge() {
		return this.age;
	}

	public void setAge(java.lang.Integer age) {
		this.age = age;
	}

	public java.lang.String getSex() {
		return this.sex;
	}

	public void setSex(java.lang.String sex) {
		this.sex = sex;
	}

	public java.lang.String getPhone() {
		return this.phone;
	}

	public void setPhone(java.lang.String phone) {
		this.phone = phone;
	}

	public java.lang.String getMobile() {
		return this.mobile;
	}

	public void setMobile(java.lang.String mobile) {
		this.mobile = mobile;
	}

	public java.lang.String getEmail() {
		return this.email;
	}

	public void setEmail(java.lang.String email) {
		this.email = email;
	}

	public java.lang.String getAddress() {
		return this.address;
	}

	public void setAddress(java.lang.String address) {
		this.address = address;
	}

	public java.lang.String getGradeId() {
		return this.gradeId;
	}

	public void setGradeId(java.lang.String gradeId) {
		this.gradeId = gradeId;
	}

	public java.lang.String getEduName() {
		return this.eduName;
	}

	public void setEduName(java.lang.String eduName) {
		this.eduName = eduName;
	}

	public java.lang.String getFireName() {
		return this.fireName;
	}

	public void setFireName(java.lang.String fireName) {
		this.fireName = fireName;
	}

	public java.lang.String getFirePhone() {
		return this.firePhone;
	}

	public void setFirePhone(java.lang.String firePhone) {
		this.firePhone = firePhone;
	}

	public java.lang.String getDescription() {
		return this.description;
	}

	public void setDescription(java.lang.String description) {
		this.description = description;
	}

	public java.lang.String getState() {
		return this.state;
	}

	public void setState(java.lang.String state) {
		this.state = state;
	}

	public String getRoleIds() {
		return this.roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public String getRoleIdNames() {
		return this.roleIdNames;
	}

	public void setRoleIdNames(String roleIdNames) {
		this.roleIdNames = roleIdNames;
	}

	public String getGradeName() {
		return this.gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}

	public String toString() {
		return new StringBuffer()
		.append("编号[").append(this.getId()).append("],")
		.append("姓名[").append(this.getName()).append("],")
		.append("工号[").append(this.getWorkno()).append("],")
		.append("账号[").append(this.getAccount()).append("],")
		.append("密码[").append(this.getPassword()).append("],")
		.append("身份证[").append(this.getCardno()).append("],")
		.append("年龄[").append(this.getAge()).append("],")
		.append("性别[").append(this.getSex()).append("],")
		.append("电话号码[").append(this.getPhone()).append("],")
		.append("手机号码[").append(this.getMobile()).append("],")
		.append("邮箱[").append(this.getEmail()).append("],")
		.append("地址[").append(this.getAddress()).append("],")
		.append("级别[").append(this.getGradeId()).append("],")
		.append("学历[").append(this.getEduName()).append("],")
		.append("紧急联系人[").append(this.getFireName()).append("],")
		.append("紧急联系电话[").append(this.getFirePhone()).append("],")
		.append("备注[").append(this.getDescription()).append("],")
		.append("是否有效,是/否/离职[").append(this.getState()).append("],")
		.toString();
	}

	public int hashCode() {
		return new HashCodeBuilder()
			.append(this.getId())
			.toHashCode();
	}

	public boolean equals(Object obj) {
		if (obj instanceof User) {
			return false;
		}
		if (this == obj) {
			return true;
		}
		User other = (User) obj;
		return new EqualsBuilder().append(this.getId(), other.getId()).isEquals();
	}

}
