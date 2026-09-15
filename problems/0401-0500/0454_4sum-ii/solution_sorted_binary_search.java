import java.util.Arrays;

class Solution {

    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        // Same split as the hash-map version -- a+b+c+d = 0 iff a+b = -(c+d)
        // -- but the join is ordered ground rather than a table: materialise
        // both halves' pair sums and sort the right one.
        int[] left = new int[nums1.length * nums2.length];
        int at = 0;
        for (int a : nums1) {
            for (int b : nums2) {
                left[at++] = a + b;
            }
        }
        int[] right = new int[nums3.length * nums4.length];
        at = 0;
        for (int c : nums3) {
            for (int d : nums4) {
                right[at++] = c + d;
            }
        }
        Arrays.sort(right);
        // Each left sum asks "how many right sums equal my negation?"; on a
        // sorted array a pair of binary searches brackets exactly that run.
        // Counts can reach n^4 = 1.6e9, so the tally widens to 64 bits.
        long total = 0;
        for (int sum : left) {
            total += upperBound(right, -sum) - lowerBound(right, -sum);
        }
        return (int) total;
    }

    // First index whose value is >= wanted.
    private int lowerBound(int[] values, int wanted) {
        int low = 0,
            high = values.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (values[mid] < wanted) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    // First index whose value is > wanted.
    private int upperBound(int[] values, int wanted) {
        int low = 0,
            high = values.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (values[mid] <= wanted) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}
