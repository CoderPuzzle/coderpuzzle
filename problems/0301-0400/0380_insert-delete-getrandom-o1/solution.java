import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

class RandomizedSet {

    // Hash map from value -> index, plus a values array. remove swaps the
    // victim with the last element and pops, so every operation is O(1);
    // getRandom draws uniformly from the live values.
    private final List<Integer> values = new ArrayList<>();
    private final Map<Integer, Integer> index = new HashMap<>();

    public RandomizedSet() {}

    public boolean insert(int val) {
        if (index.containsKey(val)) {
            return false;
        }
        index.put(val, values.size());
        values.add(val);
        return true;
    }

    public boolean remove(int val) {
        Integer slot = index.remove(val);
        if (slot == null) {
            return false;
        }
        int last = values.size() - 1;
        if (slot != last) {
            int moved = values.get(last);
            values.set(slot, moved);
            index.put(moved, slot);
        }
        values.remove(last);
        return true;
    }

    public int getRandom() {
        return values.get(ThreadLocalRandom.current().nextInt(values.size()));
    }
}
