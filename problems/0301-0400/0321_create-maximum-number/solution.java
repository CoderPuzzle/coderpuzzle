import java.util.Arrays;

class Solution {

    public int[] maxNumber(int[] nums1, int[] nums2, int k) {
        int[] best = new int[0];
        // Try every split of the k digits between the two arrays and keep the
        // best merged candidate; the answer is the max over all splits.
        for (int take1 = 0; take1 <= nums1.length; ++take1) {
            int take2 = k - take1;
            if (take2 < 0 || take2 > nums2.length) continue;
            int[] candidate = merge(maxSubsequence(nums1, take1), maxSubsequence(nums2, take2));
            // greater also accepts an all-equal pair, which is harmless here.
            if (greater(candidate, 0, best, 0)) best = candidate;
        }
        return best;
    }

    private int[] maxSubsequence(int[] nums, int t) {
        // Monotonic stack: while digits can still be dropped, pop any smaller
        // digit in front of a larger newcomer, then keep the first t digits.
        int[] stack = new int[nums.length];
        int top = 0,
            drop = nums.length - t;
        for (int num : nums) {
            while (drop > 0 && top > 0 && stack[top - 1] < num) {
                top--;
                drop--;
            }
            stack[top++] = num;
        }
        return Arrays.copyOf(stack, t);
    }

    private int[] merge(int[] a, int[] b) {
        int[] merged = new int[a.length + b.length];
        int i = 0,
            j = 0,
            out = 0;
        while (i < a.length && j < b.length) {
            // Equal heads are decided by comparing the tails that follow.
            if (greater(a, i, b, j)) merged[out++] = a[i++];
            else merged[out++] = b[j++];
        }
        while (i < a.length) merged[out++] = a[i++];
        while (j < b.length) merged[out++] = b[j++];
        return merged;
    }

    private boolean greater(int[] a, int i, int[] b, int j) {
        // Is a[i:] the larger remaining sequence? Skip the equal prefix first;
        // whichever tail runs out (or holds the smaller digit) loses the tie.
        while (i < a.length && j < b.length && a[i] == b[j]) {
            i++;
            j++;
        }
        return j == b.length || (i < a.length && a[i] > b[j]);
    }
}
