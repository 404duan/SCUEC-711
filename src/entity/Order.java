package entity;

//import java.util.List;

public class Order {
	private int o_id;
	private String orderID;
	private int goodsID;
	private int goodsnum;
	private OrderForm orform;
	
	public int getO_id() {
		return o_id;
	}
	public void setO_id(int o_id) {
		this.o_id = o_id;
	}
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
	
	
	public OrderForm getOrform() {
		return orform;
	}
	public void setOrform(OrderForm orform) {
		this.orform = orform;
	}
	@Override
	public String toString() {
		return "Order [o_id=" + o_id + ", orderID=" + orderID + ", goodsID=" + goodsID + ", goodsnum=" + goodsnum
				+ ", orform=" + orform + "]";
	}
	
}
