package test;

public class orderlist {
	private String orderID;
	private int goodsID;
	private int goodsnum;
	public String getOrderID() {
		return orderID;
	}
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
	public int getGoodsID() {
		return goodsID;
	}
	public void setGoodsID(int goodsID) {
		this.goodsID = goodsID;
	}
	public int getGoodsnum() {
		return goodsnum;
	}
	public void setGoodsnum(int goodsnum) {
		this.goodsnum = goodsnum;
	}
	@Override
	public String toString() {
		return "orderlist [orderID=" + orderID + ", goodsID=" + goodsID + ", goodsnum=" + goodsnum + "]";
	}
	
}
