/** N-ary tree node. */
public class Node {

    public int val;
    public java.util.List<Node> children;

    public Node() {}

    public Node(int val) {
        this.val = val;
    }

    public Node(int val, java.util.List<Node> children) {
        this.val = val;
        this.children = children;
    }
}
