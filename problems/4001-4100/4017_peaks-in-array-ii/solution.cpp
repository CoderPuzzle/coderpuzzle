class Solution {
  public:
    vector<long long> countOfPeaks(vector<int> &nums, vector<vector<int>> &queries) {
        int n = nums.size();
        auto is_peak = [&](int i) { return 0 < i && i < n - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1]; };

        // Ordered peak positions plus a Fenwick tree holding
        // value[p] = p * (p - prev(p)) for every present peak p.
        set<int> peaks;
        vector<long long> fen(n + 1, 0);
        auto add = [&](int i, long long delta) {
            i += 1;
            while (i <= n) {
                fen[i] += delta;
                i += i & (-i);
            }
        };
        auto prefix = [&](int i) -> long long {
            i += 1;
            long long total = 0;
            while (i > 0) {
                total += fen[i];
                i -= i & (-i);
            }
            return total;
        };
        auto range_sum = [&](int l, int r) -> long long { return prefix(r) - prefix(l - 1); };

        auto insert_peak = [&](int x) {
            // x is not present: its predecessor and successor bracket it.
            auto nit = peaks.upper_bound(x);
            long long prev_p = 0;
            if (nit != peaks.begin()) {
                auto pit = nit;
                --pit;
                prev_p = *pit;
            }
            long long next_p = nit == peaks.end() ? -1 : *nit;
            peaks.insert(x);
            add(x, x * (x - prev_p));
            if (next_p >= 0)
                add(next_p, next_p * (next_p - x) - next_p * (next_p - prev_p));
        };
        auto remove_peak = [&](int x) {
            // x is present: its predecessor and successor bracket it.
            auto cur = peaks.find(x);
            long long prev_p = 0;
            if (cur != peaks.begin()) {
                auto pit = cur;
                --pit;
                prev_p = *pit;
            }
            long long next_p = -1;
            if (cur != peaks.end()) {
                auto nit = cur;
                ++nit;
                if (nit != peaks.end())
                    next_p = *nit;
            }
            peaks.erase(cur);
            add(x, -(x * (x - prev_p)));
            if (next_p >= 0)
                add(next_p, next_p * (next_p - prev_p) - next_p * (next_p - x));
        };

        for (int i = 1; i + 1 < n; i++) {
            if (is_peak(i))
                insert_peak(i);
        }

        vector<long long> answer;
        answer.reserve(queries.size());
        for (auto &q : queries) {
            if (q[0] == 1) {
                int l = q[1], r = q[2];
                auto ait = peaks.upper_bound(l);
                if (ait == peaks.end() || *ait >= r) {
                    answer.push_back(0);
                    continue;
                }
                int a = *ait;
                auto bit = peaks.lower_bound(r);
                --bit;
                int b = *bit;
                long long qv = 0;
                if (ait != peaks.begin()) {
                    auto qit = ait;
                    --qit;
                    qv = *qit;
                }
                long long w = range_sum(a, b);
                answer.push_back((long long)r * (b - l) - w + (long long)a * (l - qv));
            } else {
                int idx = q[1], val = q[2];
                for (int j = max(0, idx - 1); j <= min(n - 1, idx + 1); j++) {
                    if (is_peak(j))
                        remove_peak(j);
                }
                nums[idx] = val;
                for (int j = max(0, idx - 1); j <= min(n - 1, idx + 1); j++) {
                    if (is_peak(j))
                        insert_peak(j);
                }
            }
        }
        return answer;
    }
};
