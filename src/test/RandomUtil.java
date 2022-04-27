package test;

import java.util.Random;

public class RandomUtil {
	public static String getRandom(int length){
 		String val = "";
 		Random random = new Random();
 		for (int i = 0; i < length; i++) {
 			val += String.valueOf(random.nextInt(10));
 		}
 		return val;
 	}
//	public static void main(String[] args) {
//		System.out.println(getRandom(6));
//	}
}