import java.util.ArrayList;
import java.util.List;

class MyHashMap {

    // A fixed array of 1009 buckets -- 1009 is prime, so key patterns that
    // repeat modulo a small number do not all pile into one bucket -- each
    // holding a small list of [key, value] pairs. A key's remainder picks
    // its bucket, and put, get and remove each scan that bucket alone: put
    // replaces the value of an existing pair in place (never a duplicate),
    // get returns the stored value or -1, and remove deletes the pair when
    // present.
    private static final int SIZE = 1009;

    private final List<List<int[]>> buckets = new ArrayList<>(SIZE);

    public MyHashMap() {
        for (int index = 0; index < SIZE; ++index) {
            buckets.add(new ArrayList<>());
        }
    }

    public void put(int key, int value) {
        List<int[]> bucket = buckets.get(key % SIZE);
        for (int[] pair : bucket) {
            if (pair[0] == key) {
                pair[1] = value;
                return;
            }
        }
        bucket.add(new int[] { key, value });
    }

    public int get(int key) {
        for (int[] pair : buckets.get(key % SIZE)) {
            if (pair[0] == key) {
                return pair[1];
            }
        }
        return -1;
    }

    public void remove(int key) {
        List<int[]> bucket = buckets.get(key % SIZE);
        for (int index = 0; index < bucket.size(); ++index) {
            if (bucket.get(index)[0] == key) {
                bucket.remove(index);
                return;
            }
        }
    }
}
