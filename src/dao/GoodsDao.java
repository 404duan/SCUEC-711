package dao;

import java.util.List;

import entity.Goods;

public interface GoodsDao {
		public List<Goods> findAll();//查询所有的方法

		public List<Goods> findTop(int goodsID,int goodsID1, int goodsID2);

		public List<Goods> findByid(int goodsID);

		public List<Goods> findBykind(int k_id);

		public List<Goods> findFront();

		public List<Goods> search(String name);

		public boolean upstock(int g_stock, int goodsID);

		public Goods findByid2(int goodsID);
}
