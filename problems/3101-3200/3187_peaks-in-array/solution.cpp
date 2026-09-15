class Solution {
  public:
    vector<int> countOfPeaks(vector<int> &nums, vector<vector<int>> &queries) {
        int n = nums.size();
        auto is_peak = [&](int i) { return 0 < i && i < n - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1]; };

        // Fenwick tree over 1-indexed positions; API is 0-indexed.
        vector<int> bit(n + 1, 0);
        auto add = [&](int i, int delta) {
            i += 1;
            while (i <= n) {
                bit[i] += delta;
                i += i & (-i);
            }
        };
        auto prefix = [&](int i) {
            i += 1;
            int total = 0;
            while (i > 0) {
                total += bit[i];
                i -= i & (-i);
            }
            return total;
        };
        auto range_sum = [&](int l, int r) {
            if (l > r)
                return 0;
            return prefix(r) - prefix(l - 1);
        };

        for (int i = 0; i < n; i++) {
            if (is_peak(i))
                add(i, 1);
        }

        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            if (q[0] == 1) {
                int l = q[1], r = q[2];
                answer.push_back(r - l < 2 ? 0 : range_sum(l + 1, r - 1));
            } else {
                int idx = q[1], val = q[2];
                for (int j = idx - 1; j <= idx + 1; j++) {
                    if (j >= 0 && j < n && is_peak(j))
                        add(j, -1);
                }
                nums[idx] = val;
                for (int j = idx - 1; j <= idx + 1; j++) {
                    if (j >= 0 && j < n && is_peak(j))
                        add(j, 1);
                }
            }
        }
        return answer;
    }
};
