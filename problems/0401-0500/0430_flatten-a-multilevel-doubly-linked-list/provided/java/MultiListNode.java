/**
 * Multilevel node: a doubly linked list whose nodes may carry a
 * child list.
 */
public class MultiListNode {

    public int val;
    public MultiListNode prev;
    public MultiListNode next;
    public MultiListNode child;

    public MultiListNode() {}

    public MultiListNode(int val) {
        this.val = val;
    }

    public MultiListNode(int val, MultiListNode prev, MultiListNode next, MultiListNode child) {
        this.val = val;
        this.prev = prev;
        this.next = next;
        this.child = child;
    }
}
