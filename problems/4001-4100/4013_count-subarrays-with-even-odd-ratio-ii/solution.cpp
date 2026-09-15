class Solution {
  public:
    long long countRatioSubarrays(vector<int> &nums, int a, int b) {
        int n = nums.size();
        // Transformed prefix sums reach 10^5 * 10^9 = 10^14 in magnitude,
        // and the answer reaches ~5 * 10^9, so both coordinates and the
        // Fenwick cells are 64-bit.
        vector<long long> pref(n + 1, 0);
        for (int i = 0; i < n; i++)
            pref[i + 1] = pref[i] + (nums[i] % 2 == 0 ? b : -(long long)a);
        // Coordinate-compress the prefix values; duplicates share one slot
        // so that >= comparisons count them all.
        vector<long long> sorted(pref);
        sort(sorted.begin(), sorted.end());
        sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
        int size = sorted.size();
        vector<long long> tree(size + 1, 0);
        auto rank = [&](long long value) {
            return int(lower_bound(sorted.begin(), sorted.begin() + size, value) - sorted.begin()) + 1;
        };
        auto update = [&](int i) {
            for (; i <= size; i += i & -i)
                tree[i]++;
        };
        auto query = [&](int i) { // how many inserted prefixes have rank <= i
            long long total = 0;
            for (; i > 0; i -= i & -i)
                total += tree[i];
            return total;
        };
        long long answer = 0;
        update(rank(pref[0]));
        long long seen = 1;
        for (int m = 1; m <= n; m++) {
            int r = rank(pref[m]);
            // Subarray [m-1, k] for every earlier l = k with
            // pref[m] <= pref[l]: everything seen minus what is strictly below.
            answer += seen - query(r - 1);
            update(r);
            seen++;
        }
        return answer;
    }
};
