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

import dao.UserDao;
import entity.User;

@RestController  //@Controller
@RequestMapping(value="/user")
public class UserAciton {

	@Autowired
	UserDao userDao ;
	
//	@CrossOrigin
	@GetMapping(value="findAll")
	public User findAll(@RequestParam String name){
		System.out.println(name);
		User user=new User();
		user.setU_id(1);
		user.setU_username(name);
//		user.setU_password(password);
		System.out.println(user);
		return user;
	}
	
//	@CrossOrigin
	@GetMapping(value="findAll2")
	public List<User> findAll2(@RequestParam String name){
		System.out.println(name);
		return userDao.findAll();
	}
	
	@GetMapping(value="selectByname")
	public User selectByname(@RequestParam String name) {
//		System.out.print(name);
//		System.out.println(userDao.selectByname(name));
		return userDao.selectByname(name);
	}
	
	@GetMapping(value="login")
	public boolean login(@RequestParam String name,String password) {
//		System.out.print(name);
//		System.out.println(password);
		if(userDao.login(name, password)!=null) {
			return true;
		}
		else {
			return false;
		}
	}
	
	@GetMapping(value="register")
	public boolean register(@RequestParam String name,String password) {
		if(userDao.register(name, password)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	@GetMapping(value="reAddr")
	public boolean reAddr(@RequestParam String addr,String tel,String username,String nickname) {
		if(userDao.reAddr(addr, tel, username, nickname)) {
			return true;
		}
		else {
			return false;
		}
	}
	
}
