class Solution {
  public:
    int countElements(vector<int> &nums, int k) {
        // The full sorted order is more than the answer needs: the count
        // is decided entirely by which values sit strictly below
        // sorted[n - k - 1]. Quickselect learns that one threshold value
        // without paying to order everything else.
        int target = (int)nums.size() - k - 1;
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
            // partition is expected to shrink the window by a constant
            // factor, so the total work stays linear instead of degrading
            // to quadratic on sorted arrays.
            int r = lo + (int)(next_rand() % (uint64_t)(hi - lo + 1));
            swap(nums[r], nums[hi]);
            int pivot = nums[hi];
            // Three-way (Dutch flag) split: values strictly below the
            // pivot move to the front block, values strictly above to the
            // back block, and the pivot's own run sits between them. A
            // run of equals leaves the window together, which is what
            // keeps heavily duplicated inputs fast.
            int lt = lo, i = lo, gt = hi;
            while (i <= gt) {
                if (nums[i] < pivot) {
                    swap(nums[lt], nums[i]);
                    lt++;
                    i++;
                } else if (nums[i] > pivot) {
                    swap(nums[i], nums[gt]);
                    gt--;
                } else {
                    i++;
                }
            }
            // [lo, lt-1] < pivot, [lt, gt] == pivot, [gt+1, hi] > pivot;
            // keep only the block still covering the target index.
            if (target < lt)
                hi = lt - 1;
            else if (target > gt)
                lo = gt + 1;
            else
                break;
        }
        int threshold = nums[target];
        // Elements strictly below the threshold qualify wholesale; the run
        // AT it qualifies only when its strictly-greater count reaches k.
        int less = 0, equal = 0;
        for (int value : nums) {
            if (value < threshold)
                less++;
            else if (value == threshold)
                equal++;
        }
        return (int)nums.size() - less - equal >= k ? less + equal : less;
    }
};
