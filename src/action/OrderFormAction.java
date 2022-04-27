package action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import dao.OrderDao;
import dao.OrderFormDao;
import dao.GoodsDao;

import entity.Order;
import entity.OrderForm;
import entity.Goods;

import test.RandomUtil;;

@RestController  //@Controller
@RequestMapping(value="/orderform")
public class OrderFormAction {
	@Autowired
	OrderFormDao orderformDao;
	@Autowired
	OrderDao orderDao;
	@Autowired
	GoodsDao goodsDao;
	
//	@CrossOrigin
	@GetMapping(value="findByid")
	public List<OrderForm> findByid(@RequestParam String orderID){
//		System.out.println(name);
		return orderformDao.findByid(orderID);
	}
	
//	@CrossOrigin
	@GetMapping(value="findByuid")
	public List<OrderForm> findByuid(@RequestParam String uid){
//		System.out.println(name);
		return orderformDao.findByuid(uid);
	}
	
//	@CrossOrigin
	//���ɶ���
	@GetMapping(value="createOrd")
	public List<OrderForm> createOrd(@RequestParam String timeNum,String time,int uid,float prices,String address,String tel){
		String orderID = timeNum + RandomUtil.getRandom(6);
		orderformDao.createOrd(orderID,time,uid,prices,address,tel);
		System.out.println(orderformDao.findByid(orderID));
		return orderformDao.findByid(orderID);
	}
	
//	@CrossOrigin
	@GetMapping(value="upst")
	public boolean upSt(@RequestParam String orderID){
		orderformDao.upSt(orderID);	//�û�ȷ���ջ���������ݿⶩ��״̬
		return true;
	}
	
//	@CrossOrigin
	@GetMapping(value="findOrdNum")
	public List<Order> findOrdNum(@RequestParam int u_id){
		return orderformDao.findOrdNum(u_id);	//ͨ���û�ID���Ҷ������ݱ�,���ض�����/��ƷID/��Ʒ�����б�
	}
	
//	@CrossOrigin
	@GetMapping(value="findGoods")
	public List<Goods> findGoods(@RequestParam int u_id){
		return orderformDao.findGoods(u_id);	//ͨ���û�ID���Ҷ������ݱ��а�����Ʒ�б�
	}
	
	
//	public List<Goods> findgoodslist()
}
