class Solution {
  public:
    int search(vector<int> &nums, int target) {
        // Invariant binary search can still ride on: inside any window
        // [lo, hi], the midpoint splits it into two halves and at least one
        // half is properly sorted.
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            // <= (not <) matters for the degenerate window where lo and mid
            // coincide; an unrotated array simply always picks left.
            if (nums[lo] <= nums[mid]) {
                // Left half is sorted, so its value range is exactly known:
                // one containment test decides whether target can live there.
                if (nums[lo] <= target && target < nums[mid]) {
                    hi = mid - 1;
                } else {
                    // Not in the sorted half, so target -- if present --
                    // must be in the other half.
                    lo = mid + 1;
                }
            } else {
                // Right half is the sorted one; same containment logic.
                if (nums[mid] < target && target <= nums[hi]) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }
        // Window emptied without a hit; distinct values keep the range tests
        // from ever straddling the rotation point ambiguously.
        return -1;
    }
};
