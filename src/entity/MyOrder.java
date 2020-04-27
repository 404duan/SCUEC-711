package entity;

import java.util.List;

//import entity.Goods;

public class MyOrder {
	private String orderID;
	private String address;
	private float prices;
	private int status;
	private String time;
	private int goodsnum;
	private List<Goods> goodsList;
	public String getOrderID() {
		return orderID;
	}
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public float getPrices() {
		return prices;
	}
	public void setPrices(float prices) {
		this.prices = prices;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public int getGoodsnum() {
		return goodsnum;
	}
	public void setGoodsnum(int goodsnum) {
		this.goodsnum = goodsnum;
	}
	public List<Goods> getGoodsList() {
		return goodsList;
	}
	public void setGoodsList(List<Goods> goodsList) {
		this.goodsList = goodsList;
	}
	@Override
	public String toString() {
		return "MyOrder [orderID=" + orderID + ", address=" + address + ", prices=" + prices + ", status=" + status
				+ ", time=" + time + ", goodsnum=" + goodsnum + ", goodsList=" + goodsList + "]";
	}
	
}
