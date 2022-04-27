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
	//生成订单
	@GetMapping(value="updAll")
	public String updAll(@RequestParam String ordersList){
		String regex = "\\D+";	//匹配数字
		String digitWord[] = ordersList.split(regex);	//获取数字模式
		int size = (digitWord.length-1)/3;
		String orderID[] = new String[size];
		int goodsID[] = new int[size];
		int goodsnum[] = new int[size];

		int j=0;
		for(int i=1;i < digitWord.length;i+=3) {
			orderID[j] = digitWord[i];
			goodsID[j] = Integer.parseInt(digitWord[i+1]);	//类型转换为int
			goodsnum[j] = Integer.parseInt(digitWord[i+2]);
			if(udSokSale(orderID[j],goodsID[j],goodsnum[j]));	//更新完成
			else	return "false!";
			System.out.println("orderID:"+orderID[j]+"\ngoodsID:"+goodsID[j]+"\ngoodsnum:"+goodsnum[j]+"\n");
			j++;
		}
		return "true";
	}
	
	//更新测试
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
		//插入订单内容表
		orderDao.inOrder(orderID,goodsID,goodsnum);
		
		//更新库存
		int g_stock = 0;
		//如果list里只有一个或者没有元素的话，盲目的直接用list.get(1)有可能报空指针异常
		g_stock = goodsDao.findByid(goodsID).get(0).getG_stock();
		System.out.println(g_stock);

		g_stock -= goodsnum;	//需要更新的库存值
		if(goodsDao.upstock(g_stock,goodsID));	//库存更新完成
		
		//更新销量
		int sales = 0;
		sales = salesDao.findByid(goodsID).get(0).getAllSales();
		sales += goodsnum;	//需要更新的销量值
		if(salesDao.upsales(sales,goodsID));	//销量更新完成
		
		return true;
	}
	
}
