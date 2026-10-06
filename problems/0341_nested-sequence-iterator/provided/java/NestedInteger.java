/** LeetCode's nested-list API: an integer or a list of NestedInteger. */
public class NestedInteger {

    private Integer integer;
    private java.util.List<NestedInteger> list = new java.util.ArrayList<>();

    public NestedInteger() {}

    public NestedInteger(int value) {
        setInteger(value);
    }

    public boolean isInteger() {
        return integer != null;
    }

    public Integer getInteger() {
        return integer;
    }

    public void setInteger(int value) {
        this.integer = value;
        this.list = new java.util.ArrayList<>();
    }

    public void add(NestedInteger item) {
        this.integer = null;
        this.list.add(item);
    }

    public java.util.List<NestedInteger> getList() {
        return list;
    }
}
