import java.util.Arrays;

class Solution {

    public int minimumTime(int[] nums1, int[] nums2, int x) {
        // Exchange arguments: each index needs zeroing at most once ("shift
        // left" removes repeats), and among the kept zeroings larger rates
        // belong later - taking element e as operation j removes
        // nums1[e] + nums2[e] * j of the eventual sum. Sort ascending by rate.
        int n = nums1.length;
        Integer[] order = new Integer[n];
        for (int index = 0; index < n; index++) {
            order[index] = index;
        }
        Arrays.sort(order, (left, right) -> Integer.compare(nums2[left], nums2[right]));
        long base = 0;
        long growth = 0;
        for (int index = 0; index < n; index++) {
            base += nums1[index];
            growth += nums2[index];
        }
        // Best[j] = the most removable using exactly j operations among the
        // elements processed so far; sums reach ~10^9 where an int would be
        // tight, so long carries all intermediates.
        long[] best = new long[n + 1];
        for (int position = 1; position <= n; position++) {
            int index = order[position - 1];
            long initial = nums1[index];
            long rate = nums2[index];
            for (int count = position; count >= 1; count--) {
                long candidate = best[count - 1] + initial + rate * count;
                if (candidate > best[count]) {
                    best[count] = candidate;
                }
            }
        }
        for (long time = 0; time <= n; time++) {
            if (base + growth * time - best[(int) time] <= x) {
                return (int) time;
            }
        }
        return -1;
    }
}
