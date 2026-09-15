class Solution {
  public:
    long long numberOfPairs(vector<int> &nums1, vector<int> &nums2, int diff) {
        int n = nums1.size();
        vector<long long> values(n);
        long long lo = LLONG_MAX, hi = LLONG_MIN;
        for (int i = 0; i < n; i++) {
            values[i] = (long long)nums1[i] - nums2[i];
            lo = min(lo, values[i]);
            hi = max(hi, values[i]);
        }
        int size = (int)(hi - lo + 1);
        vector<long long> tree(size + 1, 0);
        auto update = [&](long long value) {
            int index = (int)(value - lo) + 1;
            for (; index <= size; index += index & -index)
                tree[index] += 1;
        };
        auto query = [&](long long value) {
            int index = (int)(min(value, hi) - lo) + 1;
            long long total = 0;
            for (; index > 0; index -= index & -index)
                total += tree[index];
            return total;
        };
        long long count = 0;
        for (int i = 0; i < n; i++) {
            long long target = values[i] + diff;
            if (target >= lo)
                count += query(target);
            update(values[i]);
        }
        return count;
    }
};
