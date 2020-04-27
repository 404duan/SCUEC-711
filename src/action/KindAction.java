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

import dao.KindDao;
import entity.Kind;

@RestController  //@Controller
@RequestMapping(value="/kind")
public class KindAction {

	@Autowired
	KindDao kindDao ;
	
//	@CrossOrigin
	@GetMapping(value="findAll2")
	public Kind findAll(@RequestParam int k_id){
		System.out.println(k_id);
		Kind kind=new Kind();
		kind.setK_id(k_id);
		System.out.println(kind);
		return kind;
	}
	
//	@CrossOrigin
	@GetMapping(value="findAll")
	public List<Kind> findAll(){
//		System.out.println(name);
		return kindDao.findAll();
	}
}
