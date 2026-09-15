import java.util.*;

class Solution {

    public int deleteAndEarn(int[] nums) {
        // Deleting one copy of v removes its neighbors for free, so a strategy
        // just picks distinct values, earning v * count[v] each — house-robber
        // over the sorted distinct values (TreeMap iterates them in order).
        TreeMap<Integer, Integer> count = new TreeMap<>();
        for (int v : nums) {
            count.merge(v, 1, Integer::sum);
        }
        long take = 0,
            skip = 0;
        Integer prev = null;
        for (Map.Entry<Integer, Integer> e : count.entrySet()) {
            int value = e.getKey();
            // Adjacent predecessor conflicts with its take; a gap (missing v-1)
            // makes taking v conflict with nothing, so both states carry in.
            long base = prev != null && prev == value - 1 ? skip : Math.max(take, skip);
            long newTake = base + (long) value * e.getValue();
            long newSkip = Math.max(take, skip);
            take = newTake;
            skip = newSkip;
            prev = value;
        }
        return (int) Math.max(take, skip);
    }
}
