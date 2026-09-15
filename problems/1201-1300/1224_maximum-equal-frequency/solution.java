import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxEqualFreq(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        Map<Integer, Integer> freq = new HashMap<>();
        int best = 0;
        for (int n = 1; n <= nums.length; ++n) {
            int value = nums[n - 1];
            int before = count.getOrDefault(value, 0);
            if (before > 0) merge(freq, before, -1);
            count.put(value, before + 1);
            merge(freq, before + 1, 1);

            // At most two frequency classes can ever be fixable.
            int a = -1,
                b = -1,
                classes = 0;
            for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
                if (entry.getValue() == 0) continue;
                if (classes == 0) a = entry.getKey();
                else b = entry.getKey();
                ++classes;
                if (classes > 2) break;
            }
            if (classes == 1) {
                int f = a;
                if (f == 1 || freq.get(f) == 1) best = n;
            } else if (classes == 2) {
                if (a > b) {
                    int t = a;
                    a = b;
                    b = t;
                }
                if (b == a + 1 && freq.get(b) == 1) best = n;
                else if (a == 1 && freq.get(a) == 1 && 1 + (long) b * freq.get(b) == n) best = n;
            }
        }
        return best;
    }

    private void merge(Map<Integer, Integer> map, int key, int delta) {
        int next = map.getOrDefault(key, 0) + delta;
        if (next == 0) map.remove(key);
        else map.put(key, next);
    }
}
