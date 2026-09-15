import java.util.*;

class FindSumPairs {

    // nums2 changes but nums1 never does, so keep a frequency map of nums2
    // and scan the short nums1 on every count: for each a in nums1 add
    // freq2[tot - a]. An add updates one array slot plus its two frequency
    // entries. The pair count can reach |nums1| * |nums2| = 10^8, hence long.
    private final int[] nums1;
    private final int[] nums2;
    private final Map<Integer, Integer> freq2 = new HashMap<>();

    public FindSumPairs(int[] nums1, int[] nums2) {
        this.nums1 = nums1;
        this.nums2 = nums2;
        for (int v : nums2) {
            freq2.merge(v, 1, Integer::sum);
        }
    }

    public void add(int index, int val) {
        int old = nums2[index];
        freq2.merge(old, -1, Integer::sum);
        int now = old + val;
        nums2[index] = now;
        freq2.merge(now, 1, Integer::sum);
    }

    public long count(int tot) {
        long total = 0;
        for (int a : nums1) {
            total += freq2.getOrDefault(tot - a, 0);
        }
        return total;
    }
}
