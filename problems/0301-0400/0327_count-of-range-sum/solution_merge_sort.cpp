class Solution {
  public:
    int countRangeSum(vector<int> &nums, int lower, int upper) {
        int n = (int)nums.size();
        // Range sums become pairs: count i < j with
        // prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return (int)mergeCount(prefix, 0, n, lower, upper);
    }

  private:
    long long mergeCount(vector<long long> &prefix, int lo, int hi, int lower, int upper) {
        if (lo >= hi) {
            return 0;
        }
        int mid = lo + (hi - lo) / 2;
        // Pairs inside each half first; cross pairs next.
        long long count = mergeCount(prefix, lo, mid, lower, upper) + mergeCount(prefix, mid + 1, hi, lower, upper);

        // Left half is sorted, so for each left prefix the valid right
        // entries form the window [l, r): l skips below-lower, r passes
        // at-most-upper; both pointers only ever move forward.
        int l = mid + 1;
        int r = mid + 1;
        for (int i = lo; i <= mid; i++) {
            while (l <= hi && prefix[l] - prefix[i] < lower) {
                l++;
            }
            while (r <= hi && prefix[r] - prefix[i] <= upper) {
                r++;
            }
            count += r - l;
        }

        // Standard merge re-sorts the range, restoring the invariant
        // the parent level relies on.
        vector<long long> merged;
        merged.reserve(hi - lo + 1);
        int i = lo, j = mid + 1;
        while (i <= mid && j <= hi) {
            if (prefix[i] <= prefix[j]) {
                merged.push_back(prefix[i++]);
            } else {
                merged.push_back(prefix[j++]);
            }
        }
        while (i <= mid) {
            merged.push_back(prefix[i++]);
        }
        while (j <= hi) {
            merged.push_back(prefix[j++]);
        }
        for (int k = 0; k < (int)merged.size(); k++) {
            prefix[lo + k] = merged[k];
        }
        return count;
    }
};
