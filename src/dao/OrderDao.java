package dao;

import java.util.List;

import entity.Order;

public interface OrderDao {

	public List<Order> findByid(String string);

	public void inOrder(String orderID, int goodsID, int goodsnum);

//	public List<Order> findOrdNum(int u_id);

}
