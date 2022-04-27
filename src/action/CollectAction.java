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

import dao.CollectDao;
import entity.Collect;
import dao.GoodsDao;
//import entity.Goods;

@RestController  //@Controller
@RequestMapping(value="/collect")
public class CollectAction {
	
	@Autowired
	CollectDao collectDao;
	@Autowired
	GoodsDao goodsDao;
	
//	@CrossOrigin
	@GetMapping(value="findAll")
	public List<Collect> findAll(){
		return collectDao.findAll();
	}
	
//	@CrossOrigin
	@GetMapping(value="findByname")
	public List<Collect> findByname(@RequestParam String nickname){
		return collectDao.findByname(nickname);
	}
	
//	@CrossOrigin
	@GetMapping(value="addCollection")
	public String upCollect(@RequestParam String nickname,int goodsID){
		collectDao.upCollect(goodsID,nickname);
		return nickname+"���ղر�������";
	}
	
	//removeCollection
//	@CrossOrigin
	@GetMapping(value="removeCollection")
	public String removeCollection(@RequestParam String nickname,int goodsID){
		collectDao.removeCollection(nickname,goodsID);
		return nickname+"���ղر�������";
	}
	
	//ǰ�˴����û������� ��˷��ش��û����ղ���Ʒ�б�
	@CrossOrigin
	@GetMapping(value="fgByname")
	public List<Collect> fgByname(@RequestParam String u_nickname){
		return collectDao.fgByname(u_nickname);
	}

}
