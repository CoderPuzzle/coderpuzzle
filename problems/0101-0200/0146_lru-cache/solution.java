import java.util.HashMap;
import java.util.Map;

class LRUCache {

    // Hash map from key -> list node over a doubly linked recency list.
    // The head side is most recently used; the tail side is least recently
    // used. Sentinel head/tail nodes remove every boundary case.
    private static final class Node {

        int key;
        int value;
        Node prev;
        Node next;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private final int capacity;
    private final Map<Integer, Node> nodes = new HashMap<>();
    private final Node head = new Node(-1, -1); // before the most recent
    private final Node tail = new Node(-1, -1); // after the least recent

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    private void unlink(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void pushFront(Node node) {
        Node first = head.next;
        node.prev = head;
        node.next = first;
        head.next = node;
        first.prev = node;
    }

    public int get(int key) {
        Node node = nodes.get(key);
        if (node == null) {
            return -1;
        }
        unlink(node);
        pushFront(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = nodes.get(key);
        if (node != null) {
            node.value = value;
            unlink(node);
            pushFront(node);
            return;
        }
        if (nodes.size() == capacity) {
            Node lru = tail.prev;
            unlink(lru);
            nodes.remove(lru.key);
        }
        Node created = new Node(key, value);
        nodes.put(key, created);
        pushFront(created);
    }
}
