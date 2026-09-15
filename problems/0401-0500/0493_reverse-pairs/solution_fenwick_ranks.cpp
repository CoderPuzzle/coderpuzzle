class Solution {
  public:
    int reversePairs(vector<int> &nums) {
        // Widen to 64-bit: values reach both int32 extremes and 2 * value
        // would overflow.
        vector<long long> vals(nums.begin(), nums.end());
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        // Fenwick over compressed ranks instead of merge-sort counting:
        // walk right-to-left, so by the time the walk reaches an entry the
        // tree holds exactly the entries to that entry's right. Values span
        // the full int32 range, so the ranks come from the sorted distinct
        // values, and their doubled selves ride beside them — x qualifies
        // against v exactly when 2 * v < x.
        vector<long long> doubled(vals.size());
        for (size_t i = 0; i < vals.size(); i++) {
            doubled[i] = 2LL * vals[i];
        }
        const int size = (int)vals.size();
        vector<int> bit(size + 1, 0);

        auto update = [&](int i, int delta) {
            while (i <= size) {
                bit[i] += delta;
                i += i & (-i);
            }
        };
        auto query = [&](int i) {
            int total = 0;
            while (i > 0) {
                total += bit[i];
                i -= i & (-i);
            }
            return total;
        };
        auto lowerBound = [&](const vector<long long> &a, long long target) {
            int lo = 0;
            int hi = (int)a.size();
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (a[mid] < target) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            return lo;
        };

        // The tally is kept 64-bit alongside the widened comparisons.
        long long count = 0;
        for (int k = (int)nums.size() - 1; k >= 0; k--) {
            long long x = nums[k];
            // Every held value with 2 * v < x ranks below the cut, so the
            // prefix query totals exactly the later entries x more than
            // doubles — and querying before inserting keeps x from counting
            // itself.
            count += query(lowerBound(doubled, x));
            update(lowerBound(vals, x) + 1, 1);
        }
        return (int)count;
    }
};
