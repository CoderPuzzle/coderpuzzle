/**
 * Binary-tree node carrying the 116/117 <code>next</code> wire
 * (with a <code>parent</code> back-pointer for the 510 wire).
 */
public class NodeWithNext {

    public int val;
    public NodeWithNext left;
    public NodeWithNext right;
    public NodeWithNext next;
    public NodeWithNext parent;

    public NodeWithNext() {}

    public NodeWithNext(int val) {
        this.val = val;
    }

    public NodeWithNext(int val, NodeWithNext left, NodeWithNext right, NodeWithNext next) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.next = next;
    }
}
