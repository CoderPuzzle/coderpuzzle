import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] minDistinctFreqPair(int[] nums) {
        // Values and frequencies are at most 100, so int arithmetic
        // carries everything without overflow.
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : nums) {
            freq.merge(x, 1, Integer::sum);
        }
        List<Integer> values = new ArrayList<>(freq.keySet());
        Collections.sort(values);
        // If any valid pair exists, its x is always the smallest distinct
        // value: if every larger value shared freq[x], all of nums would
        // share one frequency and no pair could differ. So one scan past
        // the first value finds the smallest qualifying y.
        int x = values.get(0);
        for (int y : values) {
            if (y > x && !freq.get(y).equals(freq.get(x))) {
                return new int[] { x, y };
            }
        }
        return new int[] { -1, -1 };
    }
}
