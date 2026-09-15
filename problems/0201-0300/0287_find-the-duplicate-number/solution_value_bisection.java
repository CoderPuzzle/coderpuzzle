class Solution {

    public int findDuplicate(int[] nums) {
        // Bisect the value range 1..n instead of chasing pointers: count(x),
        // the number of entries <= x, exceeds x exactly when the duplicate
        // is <= x, so the smallest overloaded value is the answer.
        int n = nums.length - 1;
        int lo = 1,
            hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            // Pigeonhole: at most mid entries can be <= mid while all their
            // values are distinct, so an excess count pins the repeat to the
            // lower half and a shortfall pins it above mid.
            int count = 0;
            for (int value : nums) {
                if (value <= mid) ++count;
            }
            if (count > mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The bounds meet on the repeated value.
        return lo;
    }
}
