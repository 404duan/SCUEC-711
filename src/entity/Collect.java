package entity;

import java.util.List;

public class Collect {
	private int c_id;
	private int goodsID;
	private String u_nickname;
	private List<Goods> goodsList;
	
	public int getC_id() {
		return c_id;
	}
	public void setC_id(int c_id) {
		this.c_id = c_id;
	}
	public int getGoodsID() {
		return goodsID;
	}
	public void setGoodsID(int goodsID) {
		this.goodsID = goodsID;
	}
	public String getU_nickname() {
		return u_nickname;
	}
	public void setU_nickname(String u_nickname) {
		this.u_nickname = u_nickname;
	}
	
	public List<Goods> getGoodsList() {
		return goodsList;
	}
	public void setGoodsList(List<Goods> goodsList) {
		this.goodsList = goodsList;
	}
	@Override
	public String toString() {
		return "Collect [c_id=" + c_id + ", goodsID=" + goodsID + ", u_nickname=" + u_nickname + ", goodsList="
				+ goodsList + "]";
	}
	
}
