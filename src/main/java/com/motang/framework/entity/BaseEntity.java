package com.motang.framework.entity;




/**
 *  Entity基类,所有的entity必须继承此类
 * @copyright {@link 9iu.org}
 * @author springrain<9iuorg@gmail.com>
 * @version  2013-03-19 11:08:15
 * @see org.springrain.frame.entity.BaseEntity
 */
public class BaseEntity  implements IBaseEntity {


	private static final long serialVersionUID = 1L;
	

	
	/**
	 * 表的别名,用于处理复杂的where 条件拼接
	 */
	private String frameTableAlias=null;
	
	public static long isSerialVersionUID() {
		return serialVersionUID;
	}
	
	public void setSerialVersionUID(long l) {
		//return serialVersionUID;
	}
	public String getFrameTableAlias() {
		return frameTableAlias;
	}
	
	public String isFrameTableAlias() {
		return frameTableAlias;
	}

	public void setFrameTableAlias(String frameTableAlias) {
		this.frameTableAlias = frameTableAlias;
	}

	

	
}
