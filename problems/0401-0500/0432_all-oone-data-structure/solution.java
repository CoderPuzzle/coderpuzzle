import java.util.HashMap;
import java.util.Map;

class AllOne {

    // One key entry, living in the node list of its count bucket.
    private static final class Node {

        String key;
        Node prev;
        Node next;
        Bucket bucket;
    }

    // One count value: the keys currently at that count, threaded on a DLL
    // of buckets in increasing count order.
    private static final class Bucket {

        int count;
        final Node head = new Node(); // before the first key
        final Node tail = new Node(); // after the last key
        Bucket prev;
        Bucket next;

        Bucket(int count) {
            this.count = count;
            head.next = tail;
            tail.prev = head;
        }
    }

    private final Map<String, Node> nodes = new HashMap<>();
    private final Bucket first = new Bucket(0); // sentinel before the min
    private final Bucket last = new Bucket(0); // sentinel after the max

    public AllOne() {
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

    // Counts change by one, so the target bucket is always the neighbour on
    // that side — or a new bucket created exactly there.
    private void move(Node node, int target, boolean up) {
        Bucket old = node.bucket;
        unlinkNode(node);
        Bucket neighbour = up ? old.next : old.prev;
        Bucket bucket = neighbour.count == target ? neighbour : new Bucket(target);
        if (bucket != neighbour) {
            addBucketAfter(up ? old : neighbour, bucket);
        }
        pushNode(bucket, node);
        if (old.head.next == old.tail) {
            unlinkBucket(old);
        }
    }

    public void inc(String key) {
        Node node = nodes.get(key);
        if (node == null) {
            node = new Node();
            node.key = key;
            nodes.put(key, node);
            Bucket target = first.next.count == 1 ? first.next : new Bucket(1);
            if (target != first.next) {
                addBucketAfter(first, target);
            }
            pushNode(target, node);
            return;
        }
        move(node, node.bucket.count + 1, true);
    }

    public void dec(String key) {
        Node node = nodes.get(key);
        if (node.bucket.count == 1) {
            Bucket bucket = node.bucket;
            unlinkNode(node);
            if (bucket.head.next == bucket.tail) {
                unlinkBucket(bucket);
            }
            nodes.remove(key);
            return;
        }
        move(node, node.bucket.count - 1, false);
    }

    public String getMaxKey() {
        Bucket bucket = last.prev;
        return bucket == first ? "" : bucket.head.next.key;
    }

    public String getMinKey() {
        Bucket bucket = first.next;
        return bucket == last ? "" : bucket.head.next.key;
    }
}
