package entity;

public class SalesCount {
	private int goodsID;
	private int daySales;
	private int allSales;

	public int getGoodsID() {
		return goodsID;
	}
	public void setGoodsID(int goodsID) {
		this.goodsID = goodsID;
	}
	public int getDaySales() {
		return daySales;
	}
	public void setDaySales(int daySales) {
		this.daySales = daySales;
	}
	public int getAllSales() {
		return allSales;
	}
	public void setAllSales(int allSales) {
		this.allSales = allSales;
	}
	
	@Override
	public String toString() {
		return "SalesCount [goodsID=" + goodsID + ", daySales=" + daySales + ", allSales=" + allSales + "]";
	}
	
}
