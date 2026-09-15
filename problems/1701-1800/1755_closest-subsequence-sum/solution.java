import java.util.Arrays;

class Solution {

    public int minAbsDifference(int[] nums, int goal) {
        // Meet in the middle: 2^40 is hopeless, but two halves of <= 20
        // elements enumerate ~10^6 sums each, and every subsequence sum is
        // sL + sR with one part from each side.
        int half = nums.length / 2;
        int[] left = subsetSums(nums, 0, half);
        int[] right = subsetSums(nums, half, nums.length);
        Arrays.sort(left);
        int best = Integer.MAX_VALUE;
        for (int s : right) {
            // The best partner is the left sum nearest goal - s; anything
            // other than the floor and ceiling around the insertion point
            // lies strictly farther away.
            int need = goal - s;
            int idx = lowerBound(left, need);
            for (int j = idx - 1; j <= idx; j++) {
                if (j >= 0 && j < left.length) {
                    int diff = Math.abs(left[j] + s - goal);
                    if (diff < best) {
                        best = diff;
                    }
                }
            }
        }
        return best;
    }

    private int[] subsetSums(int[] nums, int from, int to) {
        // Doubling: each value extends the list with a shifted copy of
        // itself, turning t sums into 2t (0 included — empty set covered).
        int[] sums = new int[1];
        sums[0] = 0;
        int size = 1;
        for (int i = from; i < to; i++) {
            int value = nums[i];
            int[] next = Arrays.copyOf(sums, size * 2);
            for (int j = 0; j < size; j++) {
                next[size + j] = sums[j] + value;
            }
            sums = next;
            size *= 2;
        }
        return Arrays.copyOf(sums, size);
    }

    private int lowerBound(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
