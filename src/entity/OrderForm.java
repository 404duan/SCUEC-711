package entity;

import java.util.List;

public class OrderForm {
	private String orderID;
	private String time;
	private int u_id;
	private float prices;
	private String address;
	private char tel;
	private int status;
	private List<Order> order;
	private List<Goods> goodsList;
	
	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public int getU_id() {
		return u_id;
	}

	public void setU_id(int u_id) {
		this.u_id = u_id;
	}

	public float getPrices() {
		return prices;
	}

	public void setPrices(float prices) {
		this.prices = prices;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public char getTel() {
		return tel;
	}

	public void setTel(char tel) {
		this.tel = tel;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	

	public List<Order> getOrder() {
		return order;
	}

	public void setOrder(List<Order> order) {
		this.order = order;
	}

	public List<Goods> getGoodsList() {
		return goodsList;
	}

	public void setGoodsList(List<Goods> goodsList) {
		this.goodsList = goodsList;
	}

	@Override
	public String toString() {
		return "OrderForm [orderID=" + orderID + ", time=" + time + ", u_id=" + u_id + ", prices=" + prices
				+ ", address=" + address + ", tel=" + tel + ", status=" + status + ", order=" + order + ", goodsList="
				+ goodsList + "]";
	}
	
}
