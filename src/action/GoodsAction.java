package action;
/**
 * @author duanqi
 *
 */
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

import dao.GoodsDao;
import entity.Goods;



@RestController  //@Controller
@RequestMapping(value="/goods")
public class GoodsAction {

	@Autowired
	GoodsDao goodsDao ;
	Goods goods = new Goods();
	
//	@CrossOrigin
	@GetMapping(value="findAll")
	public List<Goods> findAll(){
		return goodsDao.findAll();
	}
	
//	@CrossOrigin
	@GetMapping(value="search")
	public List<Goods> search(@RequestParam String name){
		return goodsDao.search(name);
	}
	
//	@CrossOrigin
	@GetMapping(value="findFront")
	public List<Goods> findFront(){
		return goodsDao.findFront();
	}
	
	//通过goodsID返回一个对应商品列表
//	@CrossOrigin
	@GetMapping(value="findByid")
	public List<Goods> findByid(@RequestParam int goodsID){
		return goodsDao.findByid(goodsID);
	}
	
	//返回一个实体类的String 后端需要
//	@CrossOrigin
	@GetMapping(value="findByid2")
	public Goods findByid2(@RequestParam int goodsID){
		return goodsDao.findByid2(goodsID);
	}
	
	
	/**
	 * @author duanqi
	 * 通过类型id查找对应商品列表
	 */
//	@CrossOrigin
	@GetMapping(value="findBykind")
	public List<Goods> findBykind(@RequestParam int k_id){
		return goodsDao.findBykind(k_id);
	}
	
	//查找前三名销量的商品详情
//	@CrossOrigin
	@GetMapping(value="findTop")
	public List<Goods> findTop(@RequestParam int goodsID,int goodsID1,int goodsID2){
		return goodsDao.findTop(goodsID,goodsID1,goodsID2);
	}
}
