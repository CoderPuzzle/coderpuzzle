class Solution {
  public:
    long long goodTriplets(vector<int> &nums1, vector<int> &nums2) {
        int n = nums1.size();
        vector<int> pos2(n);
        for (int i = 0; i < n; i++) {
            pos2[nums2[i]] = i;
        }

        vector<long long> tree(n + 1, 0); // Fenwick tree over positions in nums2
        auto add = [&](int i, int delta) {
            i += 1;
            while (i <= n) {
                tree[i] += delta;
                i += i & -i;
            }
        };
        // Sum over indices 0..i inclusive; returns 0 when i < 0.
        auto prefix_sum = [&](int i) {
            if (i < 0) {
                return 0LL;
            }
            i += 1;
            long long total = 0;
            while (i > 0) {
                total += tree[i];
                i -= i & -i;
            }
            return total;
        };

        long long answer = 0;
        for (int i = 0; i < n; i++) {
            int value = nums1[i];
            int p = pos2[value];
            long long left = prefix_sum(p - 1); // values before value in nums1 and in nums2
            // values after value in both arrays
            long long right = (long long)(n - 1 - p) - (i - left);
            answer += left * right;
            add(p, 1);
        }
        return answer;
    }
};
