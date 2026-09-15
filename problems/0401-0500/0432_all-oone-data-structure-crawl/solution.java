import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class AllOne {

    // One count value and the keys currently held at it, threaded into the
    // doubly-linked bucket list kept in ascending count order.
    private static final class Bucket {

        final int count;
        final Set<String> keys = new HashSet<>();
        Bucket prev;
        Bucket next;

        Bucket(int count) {
            this.count = count;
        }
    }

    // A key-to-bucket map plus the bucket list: every inc/dec walks its key
    // exactly one bucket over, splicing the neighboring count in when it is
    // missing and dropping buckets that empty out, so the extremes sit at
    // the list's ends.
    private final Map<String, Bucket> keyBucket = new HashMap<>();
    private final Bucket head = new Bucket(0); // sentinel below every real count
    private final Bucket tail = new Bucket(0); // sentinel above every real count

    public AllOne() {
        head.next = tail;
        tail.prev = head;
    }

    private static Bucket insertAfter(Bucket anchor, int count) {
        Bucket bucket = new Bucket(count);
        bucket.prev = anchor;
        bucket.next = anchor.next;
        anchor.next.prev = bucket;
        anchor.next = bucket;
        return bucket;
    }

    private static void drop(Bucket bucket) {
        bucket.prev.next = bucket.next;
        bucket.next.prev = bucket.prev;
    }

    private static String pinned(Bucket bucket) {
        // Several keys may share the extreme count; the lexicographically
        // smallest of them is the pinned answer.
        String best = null;
        for (String key : bucket.keys) {
            if (best == null || key.compareTo(best) < 0) {
                best = key;
            }
        }
        return best;
    }

    public void inc(String key) {
        Bucket old = keyBucket.get(key);
        Bucket anchor = old == null ? head : old;
        int count = old == null ? 1 : old.count + 1;
        // The needed count is exactly one past the anchor's, so only its
        // immediate successor can already hold it.
        Bucket bucket = anchor.next.count == count ? anchor.next : insertAfter(anchor, count);
        bucket.keys.add(key);
        keyBucket.put(key, bucket);
        if (old != null) {
            old.keys.remove(key);
            if (old.keys.isEmpty()) {
                drop(old);
            }
        }
    }

    public void dec(String key) {
        Bucket old = keyBucket.remove(key); // the statement guarantees presence
        if (old.count > 1) {
            int count = old.count - 1;
            Bucket bucket = old.prev.count == count ? old.prev : insertAfter(old.prev, count);
            bucket.keys.add(key);
            keyBucket.put(key, bucket);
        }
        old.keys.remove(key);
        if (old.keys.isEmpty()) {
            drop(old);
        }
    }

    public String getMaxKey() {
        Bucket bucket = tail.prev;
        return bucket == head ? "" : pinned(bucket);
    }

    public String getMinKey() {
        Bucket bucket = head.next;
        return bucket == tail ? "" : pinned(bucket);
    }
}
