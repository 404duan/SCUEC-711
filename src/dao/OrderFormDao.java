package dao;

import java.util.List;

import entity.OrderForm;
import entity.Order;
import entity.Goods;
public interface OrderFormDao {

	public List<OrderForm> findByid(String orderID);

	public void createOrd(String orderID, String time, int uid, float prices, String address, String tel);

	public List<OrderForm> findByuid(String uid);

	public void upSt(String orderID);
	
	public List<Order> findOrdNum(int u_id);

	public List<Goods> findGoods(int i);
}
