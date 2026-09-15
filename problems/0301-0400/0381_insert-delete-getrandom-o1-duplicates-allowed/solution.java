import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

class RandomizedCollection {

    // Hash map from value -> ordered set of indices, plus a values array.
    // Deterministic variant: remove deletes the leftmost occurrence and moves
    // the last element into the vacated slot; getRandom returns values[0].
    private final List<Integer> values = new ArrayList<>();
    private final Map<Integer, TreeSet<Integer>> indices = new HashMap<>();

    public RandomizedCollection() {}

    public boolean insert(int val) {
        TreeSet<Integer> positions = indices.get(val);
        boolean present = positions != null;
        values.add(val);
        int index = values.size() - 1; // new index is always the maximum
        if (present) {
            positions.add(index);
        } else {
            TreeSet<Integer> created = new TreeSet<>();
            created.add(index);
            indices.put(val, created);
        }
        return !present;
    }

    public boolean remove(int val) {
        TreeSet<Integer> positions = indices.get(val);
        if (positions == null) {
            return false;
        }
        int index = positions.first(); // leftmost occurrence
        int last = values.size() - 1;
        int moved = values.get(last);
        if (moved == val) {
            // The moved element equals the removed one: a copy stays at
            // `index`, so only the last index leaves the set.
            positions.remove((Integer) last);
        } else {
            values.set(index, moved);
            TreeSet<Integer> others = indices.get(moved);
            others.remove((Integer) last);
            others.add(index);
            positions.remove((Integer) index);
        }
        values.remove(last);
        if (positions.isEmpty()) {
            indices.remove(val);
        }
        return true;
    }

    public int getRandom() {
        return values.get(0);
    }
}
