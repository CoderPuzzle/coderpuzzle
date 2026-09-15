import java.util.TreeMap;

class Solution {

    public boolean isNStraightHand(int[] hand, int groupSize) {
        // A divisible hand must be a multiple of groupSize long.
        if (hand.length % groupSize != 0) {
            return false;
        }
        TreeMap<Integer, Integer> counts = new TreeMap<>();
        for (int v : hand) {
            counts.merge(v, 1, Integer::sum);
        }
        // firstKey is always the smallest remaining value: it must
        // start its groups, since nothing smaller exists to extend
        // downward.
        while (!counts.isEmpty()) {
            int value = counts.firstKey();
            int need = counts.get(value);
            // Each of the next groupSize-1 values must supply at
            // least `need` cards; subtracting in bulk keeps this to
            // one pass per starting value. Removing exhausted keys
            // keeps firstKey the smallest value still held.
            for (int nv = value; nv < value + groupSize; nv++) {
                int have = counts.getOrDefault(nv, 0);
                if (have < need) {
                    return false;
                }
                if (have == need) {
                    counts.remove(nv);
                } else {
                    counts.put(nv, have - need);
                }
            }
        }
        return true;
    }
}
