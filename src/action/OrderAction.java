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
import entity.Order;
import dao.GoodsDao;
import entity.Goods;
import dao.SalesCountDao;
import entity.SalesCount;

@RestController  //@Controller
@RequestMapping(value="/order")
public class OrderAction {

	@Autowired
	OrderDao orderDao;
	@Autowired
	GoodsDao goodsDao;
	@Autowired
	SalesCountDao salesDao;
	
//	@CrossOrigin
	@GetMapping(value="findByid")
	public List<Order> findByid(@RequestParam String orderID){
//		System.out.println(name);
		return orderDao.findByid(orderID);
	}
	

	
//	@CrossOrigin
	//���ɶ���
	@GetMapping(value="updAll")
	public String updAll(@RequestParam String ordersList){
		String regex = "\\D+";	//ƥ������
		String digitWord[] = ordersList.split(regex);	//��ȡ����ģʽ
		int size = (digitWord.length-1)/3;
		String orderID[] = new String[size];
		int goodsID[] = new int[size];
		int goodsnum[] = new int[size];

		int j=0;
		for(int i=1;i < digitWord.length;i+=3) {
			orderID[j] = digitWord[i];
			goodsID[j] = Integer.parseInt(digitWord[i+1]);	//����ת��Ϊint
			goodsnum[j] = Integer.parseInt(digitWord[i+2]);
			if(udSokSale(orderID[j],goodsID[j],goodsnum[j]));	//�������
			else	return "false!";
			System.out.println("orderID:"+orderID[j]+"\ngoodsID:"+goodsID[j]+"\ngoodsnum:"+goodsnum[j]+"\n");
			j++;
		}
		return "true";
	}
	
	//���²���
//	@CrossOrigin
	@GetMapping(value="updtest")
	public boolean updtest(){
		String orderID[] = {"20190709231823487436","20190709231823487436","20190709231823487436"};
		int goodsID[] = {6,7,8};
		int goodsnum[] = {4,5,2};
		for(int i=0; i <= 2; i++) {
			if(udSokSale(orderID[i],goodsID[i],goodsnum[i]));
		}
		return true;
	}
	
//	@CrossOrigin
	@GetMapping(value="update")
	public boolean udSokSale(String orderID,int goodsID,int goodsnum){
		//���붩�����ݱ�
		orderDao.inOrder(orderID,goodsID,goodsnum);
		
		//���¿��
		int g_stock = 0;
		//���list��ֻ��һ������û��Ԫ�صĻ���äĿ��ֱ����list.get(1)�п��ܱ���ָ���쳣
		g_stock = goodsDao.findByid(goodsID).get(0).getG_stock();
		System.out.println(g_stock);

		g_stock -= goodsnum;	//��Ҫ���µĿ��ֵ
		if(goodsDao.upstock(g_stock,goodsID));	//���������
		
		//��������
		int sales = 0;
		sales = salesDao.findByid(goodsID).get(0).getAllSales();
		sales += goodsnum;	//��Ҫ���µ�����ֵ
		if(salesDao.upsales(sales,goodsID));	//�����������
		
		return true;
	}
	
}
