package dao;

import java.util.List;

import entity.User;

public interface UserDao {
		public List<User> findAll();//查询所有的方法
		public User selectByname(String name);
		public User login(String name,String password);
		public boolean register(String name,String password);
		public boolean reAddr(String addr, String tel, String username, String nickname);
}
