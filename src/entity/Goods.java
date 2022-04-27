package entity;

//import java.util.List;

public class Goods {
	private int goodsID;
	private String g_goodsname;
	private float g_goodsprice;
	private int k_id;
	private String g_describe;
	private String g_image;
	private int g_stock;
	private String g_front;
//	private Collect clt;
	private int goodsnum;
	private OrderForm orform;
	
	public String getG_front() {
		return g_front;
	}

	public void setG_front(String g_front) {
		this.g_front = g_front;
	}

	public int getGoodsID() {
		return goodsID;
	}

	public void setGoodsID(int goodsID) {
		this.goodsID = goodsID;
	}

	public String getG_goodsname() {
		return g_goodsname;
	}

	public void setG_goodsname(String g_goodsname) {
		this.g_goodsname = g_goodsname;
	}

	public float getG_goodsprice() {
		return g_goodsprice;
	}

	public void setG_goodsprice(float g_goodsprice) {
		this.g_goodsprice = g_goodsprice;
	}

	public int getK_id() {
		return k_id;
	}

	public void setK_id(int k_id) {
		this.k_id = k_id;
	}

	public String getG_describe() {
		return g_describe;
	}

	public void setG_describe(String g_describe) {
		this.g_describe = g_describe;
	}

	public String getG_image() {
		return g_image;
	}

	public void setG_image(String g_image) {
		this.g_image = g_image;
	}

	public int getG_stock() {
		return g_stock;
	}

	public void setG_stock(int g_stock) {
		this.g_stock = g_stock;
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
		return "Goods [goodsID=" + goodsID + ", g_goodsname=" + g_goodsname + ", g_goodsprice=" + g_goodsprice
				+ ", k_id=" + k_id + ", g_describe=" + g_describe + ", g_image=" + g_image + ", g_stock=" + g_stock
				+ ", g_front=" + g_front + ", goodsnum=" + goodsnum + ", orform=" + orform + "]";
	}
	
}
