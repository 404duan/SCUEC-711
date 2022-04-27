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

import dao.MyOrderDao;
import entity.MyOrder;

@RestController  //@Controller
@RequestMapping(value="/myorder")
public class MyOrderAction {

	@Autowired
	MyOrderDao myorderDao ;
	
//	@CrossOrigin
	@GetMapping(value="findByuid")
	public List<MyOrder> findAll(@RequestParam int u_id){
		return myorderDao.queryOrder(u_id);
	}
}
