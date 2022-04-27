package dao;

import java.util.List;

import entity.SalesCount;

public interface SalesCountDao {
	public List<SalesCount> findAll();

	public List<SalesCount> topSales();

	public List<SalesCount> findByid(int id);

	public boolean upsales(int sales, int goodsID);
}
