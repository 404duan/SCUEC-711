package action;

import java.util.List;

//import java.util.List;

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

import dao.SalesCountDao;
import entity.SalesCount;

@RestController  //@Controller
@RequestMapping(value="/sales")
public class SalesCountAction {

	@Autowired
	SalesCountDao salesDao ;
	
	//查找allsales前十位的商品ID
//	@CrossOrigin
	@GetMapping(value="top")
	public List<SalesCount> topSales(){
		return salesDao.topSales();
	}
	
	//通过商品ID查询其销量
//	@CrossOrigin
	@GetMapping(value="findByid")
	public List<SalesCount> findByid(@RequestParam int id){
		return salesDao.findByid(id);
	}
}
