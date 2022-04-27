package test;



import javax.annotation.Resource;
import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import dao.UserDao;
import dao.GoodsDao;
import dao.KindDao;
import dao.OrderDao;
import dao.OrderFormDao;
import dao.SalesCountDao;
import dao.MyOrderDao;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:beans.xml")
public class ConnTest {
	@Autowired(required=true)//定义一个连接池接口交给Spring管理
	@Qualifier("dataSource")
	DataSource dataSource;
	@Autowired(required=true)
	@Qualifier("sqlSessionFactoryBean")
	SqlSessionFactoryBean sqlSessionFactoryBean;
	@Resource
	UserDao userDao;
	@Resource
	KindDao kindDao;
	@Resource
	GoodsDao goodsDao;
	@Resource
	OrderDao orderDao;
	@Resource
	OrderFormDao orderFormDao;
	@Resource
	SalesCountDao salesDao;
	@Resource
	MyOrderDao myorderDao;
	@Test//单元测试注解
	public void test01(){
	
		System.out.println("data1:"+dataSource);
		System.out.println("data1_2"+orderDao.findByid("20190706155503111111"));
		System.out.println("data1_3"+orderFormDao.findByid("201907061554170000"));
	}
	@Test//单元测试注解
	public void test02(){
	
		System.out.println("data2:"+sqlSessionFactoryBean);
		System.out.println(goodsDao.upstock(100,9));
	}
	@Test//单元测试注解
	public void test03(){
	
		System.out.println("data3:"+userDao.findAll());
		System.out.println("data333:"+userDao.selectByname("段琦"));
	}
	@Test//单元测试注解
	public void test04(){
	
		System.out.println("data4:"+goodsDao.findAll());
		System.out.println("data4_2"+salesDao.upsales(1, 2));
		System.out.println("data4_3"+orderFormDao.findGoods(1));
	}
	@Test//单元测试注解
	public void test05(){
		System.out.println(this.myorderDao.queryOrder(1));
//		System.out.println("data5:"+kindDao.findAll());
//		System.out.println("data6:"+userDao.login("段琦","duan"));
////		System.out.println("data7:"+userDao.register("段琦", "ddd"))
//		System.out.println(goodsDao.findTop(3,2,1));
//		System.out.println(goodsDao.findByid(1));
	}
	
}
