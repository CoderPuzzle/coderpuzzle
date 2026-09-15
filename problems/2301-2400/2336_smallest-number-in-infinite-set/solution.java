import java.util.HashSet;
import java.util.Set;

class SmallestInfiniteSet {

    // Everything below nextNew has been popped at least once; a removed
    // value is present again exactly when it sits in this set. Values
    // >= nextNew have never been touched.
    private int nextNew = 1;
    private final Set<Integer> addedBack = new HashSet<>();

    public SmallestInfiniteSet() {}

    public int popSmallest() {
        if (!addedBack.isEmpty()) {
            int value = Integer.MAX_VALUE;
            for (int candidate : addedBack) {
                value = Math.min(value, candidate);
            }
            addedBack.remove(value);
            return value;
        }
        return nextNew++;
    }

    public void addBack(int num) {
        // Only values already popped can be added back.
        if (num < nextNew) {
            addedBack.add(num);
        }
    }
}
