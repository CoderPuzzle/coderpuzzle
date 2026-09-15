import java.util.Random;

class Skiplist {

    // A skiplist: a stack of sorted singly-linked layers, each skipping
    // over roughly half the elements below. add promotes a node to a
    // random level (geometric, p = 1/2) and splices it into every layer it
    // occupies; search/erase descend from the top layer, always moving to
    // the rightmost node whose value stays below the target.
    private static final int MAX_LEVEL = 16;
    private final Node head = new Node(-1, MAX_LEVEL);
    private final Random random = new Random();

    public Skiplist() {}

    public boolean search(int target) {
        Node cur = head;
        for (int i = MAX_LEVEL - 1; i >= 0; --i) {
            while (cur.next[i] != null && cur.next[i].val < target) {
                cur = cur.next[i];
            }
        }
        cur = cur.next[0];
        return cur != null && cur.val == target;
    }

    public void add(int num) {
        Node[] update = predecessors(num);
        Node node = new Node(num, randomLevel());
        // Splice into each layer the node actually occupies.
        for (int i = 0; i < node.next.length; ++i) {
            node.next[i] = update[i].next[i];
            update[i].next[i] = node;
        }
    }

    public boolean erase(int num) {
        Node[] update = predecessors(num);
        Node cur = update[0].next[0];
        if (cur == null || cur.val != num) {
            return false;
        }
        // Unlink cur only where it is the immediate next node; at higher
        // layers a duplicate with more levels may take over.
        for (int i = 0; i < MAX_LEVEL; ++i) {
            if (update[i].next[i] == cur) {
                update[i].next[i] = cur.next[i];
            }
        }
        return true;
    }

    // The rightmost node strictly below target at each layer.
    private Node[] predecessors(int target) {
        Node[] update = new Node[MAX_LEVEL];
        Node cur = head;
        for (int i = MAX_LEVEL - 1; i >= 0; --i) {
            while (cur.next[i] != null && cur.next[i].val < target) {
                cur = cur.next[i];
            }
            update[i] = cur;
        }
        return update;
    }

    private int randomLevel() {
        int level = 1;
        while (random.nextBoolean() && level < MAX_LEVEL) {
            ++level;
        }
        return level;
    }

    private static class Node {

        int val;
        Node[] next;

        Node(int val, int level) {
            this.val = val;
            this.next = new Node[level];
        }
    }
}
