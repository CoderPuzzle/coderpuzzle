class Solution {
  public:
    int findKthLargest(vector<int> &nums, int k) {
        // The kth largest sits at index n - k of the ascending-sorted
        // array; quickselect homes in on that target index.
        int target = (int)nums.size() - k;
        int lo = 0, hi = (int)nums.size() - 1;
        // A tiny splitmix64 generator with a fixed seed supplies the
        // uniformly random pivots.
        uint64_t rng = 215;
        auto next_rand = [&rng]() {
            rng += 0x9E3779B97F4A7C15ULL;
            uint64_t z = rng;
            z = (z ^ (z >> 30)) * 0xBF58476D1CE4E5B9ULL;
            z = (z ^ (z >> 27)) * 0x94D049BB133111EBULL;
            return z ^ (z >> 31);
        };
        while (lo < hi) {
            // A uniformly random pivot defeats adversarial inputs: every
            // partition is expected to shrink the range by a constant
            // factor, so the total work stays linear instead of
            // degrading to quadratic on sorted or all-equal arrays.
            int r = lo + (int)(next_rand() % (uint64_t)(hi - lo + 1));
            swap(nums[r], nums[hi]);
            int pivot = nums[hi];
            int store = lo;
            // Lomuto sweep: values strictly below the pivot land left of
            // `store`; duplicates ride the right side.
            for (int j = lo; j < hi; j++) {
                if (nums[j] < pivot) {
                    swap(nums[j], nums[store]);
                    store++;
                }
            }
            swap(nums[store], nums[hi]);
            // nums[store] is now in its final sorted position; keep only
            // the side that still contains the target index.
            if (store == target)
                return nums[store];
            if (store < target)
                lo = store + 1;
            else
                hi = store - 1;
        }
        return nums[target];
    }
};
