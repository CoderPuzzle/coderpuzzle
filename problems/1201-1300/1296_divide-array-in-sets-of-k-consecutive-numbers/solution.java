import java.util.TreeMap;

class Solution {

    public boolean isPossibleDivide(int[] nums, int k) {
        // size-k sets can partition the array only if k divides n
        if (nums.length % k != 0) return false;
        TreeMap<Integer, Integer> counts = new TreeMap<>();
        for (int x : nums) {
            counts.merge(x, 1, Integer::sum);
        }
        // TreeMap iterates smallest-first: the smallest remaining value
        // forces its run — every set containing it is exactly v..v+k-1
        for (int value : counts.keySet()) {
            int need = counts.get(value);
            // already fully consumed by runs started below
            if (need <= 0) continue;
            // each of the need copies of value starts its own run; any of
            // the next k values falling short means no valid division exists
            for (int i = value; i < value + k; i++) {
                int have = counts.getOrDefault(i, 0);
                if (have < need) return false;
                counts.put(i, have - need);
            }
        }
        return true;
    }
}
