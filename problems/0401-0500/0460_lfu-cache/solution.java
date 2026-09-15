import java.util.HashMap;
import java.util.Map;

class LFUCache {

    // One cache entry, living in the LRU list of its frequency bucket.
    private static final class Node {

        int key;
        int value;
        int freq = 1;
        Node prev;
        Node next;
        Bucket bucket;
    }

    // One frequency: an LRU list of nodes (head side = least recent) plus
    // links to the neighbouring frequencies. The first real bucket is always
    // the minimum frequency.
    private static final class Bucket {

        int freq;
        final Node head = new Node(); // before the least recent node
        final Node tail = new Node(); // after the most recent node
        Bucket prev;
        Bucket next;

        Bucket(int freq) {
            this.freq = freq;
            head.next = tail;
            tail.prev = head;
        }
    }

    private final int capacity;
    private final Map<Integer, Node> nodes = new HashMap<>();
    private final Bucket first = new Bucket(0); // sentinel before min frequency
    private final Bucket last = new Bucket(0); // sentinel after max frequency

    public LFUCache(int capacity) {
        this.capacity = capacity;
        first.next = last;
        last.prev = first;
    }

    private void unlinkNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void pushNode(Bucket bucket, Node node) {
        Node tail = bucket.tail.prev;
        node.prev = tail;
        node.next = bucket.tail;
        tail.next = node;
        bucket.tail.prev = node;
        node.bucket = bucket;
    }

    private void unlinkBucket(Bucket bucket) {
        bucket.prev.next = bucket.next;
        bucket.next.prev = bucket.prev;
    }

    private void addBucketAfter(Bucket anchor, Bucket bucket) {
        Bucket following = anchor.next;
        bucket.prev = anchor;
        bucket.next = following;
        anchor.next = bucket;
        following.prev = bucket;
    }

    // A use moves the node to the bucket one frequency up, creating that
    // bucket exactly where it belongs if it is missing.
    private void bump(Node node) {
        Bucket old = node.bucket;
        Bucket following = old.next;
        unlinkNode(node);
        Bucket target = following.freq == node.freq + 1 ? following : new Bucket(node.freq + 1);
        if (target != following) {
            addBucketAfter(old, target);
        }
        node.freq++;
        pushNode(target, node);
        if (old.head.next == old.tail) {
            unlinkBucket(old);
        }
    }

    public int get(int key) {
        Node node = nodes.get(key);
        if (node == null) {
            return -1;
        }
        bump(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = nodes.get(key);
        if (node != null) {
            node.value = value;
            bump(node);
            return;
        }
        if (nodes.size() == capacity) {
            Bucket victimBucket = first.next;
            Node victim = victimBucket.head.next;
            unlinkNode(victim);
            nodes.remove(victim.key);
            if (victimBucket.head.next == victimBucket.tail) {
                unlinkBucket(victimBucket);
            }
        }
        Node created = new Node();
        created.key = key;
        created.value = value;
        nodes.put(key, created);
        Bucket target = first.next.freq == 1 ? first.next : new Bucket(1);
        if (target != first.next) {
            addBucketAfter(first, target);
        }
        pushNode(target, created);
    }
}
