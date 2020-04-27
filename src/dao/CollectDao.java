package dao;

import java.util.List;

import entity.Collect;

public interface CollectDao {
	public List<Collect> findAll();//��ѯ���еķ���

	public List<Collect> findByname(String nickname);

	public void upCollect(int goodsID, String nickname);

	public List<Collect> fgByname(String u_nickname);

	public void removeCollection(String nickname, int goodsID);
}
