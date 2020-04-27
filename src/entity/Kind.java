package entity;

public class Kind {
	private int k_id;
	private String k_name;
	public int getK_id() {
		return k_id;
	}
	public void setK_id(int k_id) {
		this.k_id = k_id;
	}
	public String getK_name() {
		return k_name;
	}
	public void setK_name(String k_name) {
		this.k_name = k_name;
	}
	@Override
	public String toString() {
		return "Kind [k_id=" + k_id + ", k_name=" + k_name + "]";
	}
}
