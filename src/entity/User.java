package entity;

public class User {
 private int u_id;
 private String u_username;
 private String u_password;
 private String u_nickname;
 private String u_account;
 private String u_sex;
 private String u_address;
 private String u_tell;
 private String u_birthday;
 private String u_photo;
public int getU_id() {
	return u_id;
}
public void setU_id(int u_id) {
	this.u_id = u_id;
}
public String getU_username() {
	return u_username;
}
public void setU_username(String u_username) {
	this.u_username = u_username;
}
public String getU_password() {
	return u_password;
}
public void setU_password(String u_password) {
	this.u_password = u_password;
}
public void setU_photo(String u_photo){
	this.u_photo = u_photo;
}
public String getU_photo() {
	return u_photo;
}
public String getU_nickname() {
	return u_nickname;
}
public void setU_nickname(String u_nickname) {
	this.u_nickname = u_nickname;
}
public String getU_account() {
	return u_account;
}
public void setU_account(String u_account) {
	this.u_account = u_account;
}
public String getU_sex() {
	return u_sex;
}
public void setU_sex(String u_sex) {
	this.u_sex = u_sex;
}
public String getU_address() {
	return u_address;
}
public void setU_address(String u_address) {
	this.u_address = u_address;
}
public String getU_tell() {
	return u_tell;
}
public void setU_tell(String u_tell) {
	this.u_tell = u_tell;
}
public String getU_birthday() {
	return u_birthday;
}
public void setU_birthday(String u_birthday) {
	this.u_birthday = u_birthday;
}
@Override
public String toString() {
	return "User [u_id=" + u_id + ", u_username=" + u_username + ", u_password=" + u_password + ", u_nickname="
			+ u_nickname + ", u_account=" + u_account + ", u_sex=" + u_sex + ", u_address=" + u_address + ", u_tell="
			+ u_tell + ", u_birthday=" + u_birthday + ", u_photo=" + u_photo + "]";
}
 
}
