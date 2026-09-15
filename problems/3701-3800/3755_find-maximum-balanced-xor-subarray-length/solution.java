import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxBalancedSubarray(int[] nums) {
        // Two prefixes pin a window down: a repeated prefix XOR cancels the
        // shared head (the window's own XOR is 0), and a repeated parity gap
        // (evens minus odds so far) means the window's even and odd counts
        // tie. Matching pairs therefore bracket a balanced, zero-XOR
        // subarray, and the earliest occurrence of each pair maximizes the
        // length read off it.
        //
        // The pair packs into one long key: pxor < 2^30 and gap + n lies in
        // [0, 2n], so pxor * (2n + 1) + (gap + n) fits far below 2^63.
        int n = nums.length;
        long width = 2L * n + 1;
        Map<Long, Integer> first = new HashMap<>();
        first.put((long) n, -1);
        int pxor = 0;
        int gap = 0;
        int best = 0;
        for (int i = 0; i < n; i++) {
            int value = nums[i];
            pxor ^= value;
            gap += value % 2 == 0 ? 1 : -1;
            long key = pxor * width + (gap + n);
            Integer j = first.get(key);
            if (j == null) {
                first.put(key, i);
            } else if (i - j > best) {
                best = i - j;
            }
        }
        return best;
    }
}
