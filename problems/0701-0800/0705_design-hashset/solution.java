import java.util.ArrayList;
import java.util.List;

class MyHashSet {

    // A fixed array of 769 buckets: key % 769 selects the bucket, and the
    // bucket's short list holds exactly the keys that hashed there. add()
    // appends only when the key is absent, remove() deletes only when the
    // key is present, and contains() scans the one bucket. 769 is prime, so
    // repetitive key patterns spread out instead of piling onto one bucket.
    private static final int BUCKETS = 769;

    private final List<List<Integer>> buckets = new ArrayList<>();

    public MyHashSet() {
        for (int index = 0; index < BUCKETS; ++index) {
            buckets.add(new ArrayList<>());
        }
    }

    public void add(int key) {
        List<Integer> bucket = buckets.get(key % BUCKETS);
        if (!bucket.contains(key)) {
            bucket.add(key);
        }
    }

    public void remove(int key) {
        buckets.get(key % BUCKETS).remove(Integer.valueOf(key));
    }

    public boolean contains(int key) {
        return buckets.get(key % BUCKETS).contains(key);
    }
}
