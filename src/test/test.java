package test;
//import java.util.regex.*;
//import java.util.List;
//import test.orderlist;
public class test {
	public static void main(String[] args) {
		String str = "[{\"orderID\":\"20190709231823487436\",\"goodsID\":6,\"goodsnum\":4},{\"orderID\":\"20190709231823487436\",\"goodsID\":7,\"goodsnum\":5},{\"orderID\":\"20190709231823487436\",\"goodsID\":8,\"goodsnum\":2}]";
		String regex = "\\D+";
		String digitWord[] = str.split(regex);
		
		for(int i=1;i < digitWord.length;i+=3) {
			System.out.println("orderID:"+digitWord[i]+"\ngoodsID:"+digitWord[i+1]+"\ngoodsnum:"+digitWord[i+2]);
		}
		//List<String> ordersList		--->	String orderID,int goodsID,int goodsnum
		
//		List<String> ordersList = [{"orderID":"20190709163037869236","goodsID":6,"goodsnum":4},{"orderID":"20190709163037869236","goodsID":7,"goodsnum":5},{"orderID":"20190709163037869236","goodsID":8,"goodsnum":2},{"orderID":"","goodsID":"","goodsnum":0},{"orderID":"","goodsID":"","goodsnum":0}];
		
//		ordersList.get(0);
		System.out.println(digitWord.length);
	}
}
