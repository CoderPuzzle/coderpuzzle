class Solution {
  public:
    int xorAfterQueries(vector<int> &nums, vector<vector<int>> &queries) {
        const long long MOD = 1000000007;
        auto power = [](long long base) {
            long long result = 1;
            for (long long exp = MOD - 2; exp > 0; exp >>= 1) {
                if (exp & 1) {
                    result = result * base % MOD;
                }
                base = base * base % MOD;
            }
            return result;
        };
        int n = nums.size();
        int b = 1;
        while ((long long)(b + 1) * (b + 1) <= n) {
            b++;
        }
        // Strides above the threshold visit fewer than sqrt(n) + 1 positions
        // each and are applied literally; strides at or below it share
        // residue-class buckets, each applied in one prefix-product sweep.
        unordered_map<int, vector<pair<int, int>>> buckets;
        for (const auto &query : queries) {
            int l = query[0], r = query[1], k = query[2], v = query[3];
            if (k > b) {
                for (int idx = l; idx <= r; idx += k) {
                    nums[idx] = (int)((long long)nums[idx] * v % MOD);
                }
            } else {
                int c = l % k;
                int key = k * (b + 1) + c;
                // Coordinate events: the multiplier starts at l's coordinate
                // and stops just past the last visited coordinate.
                buckets[key].push_back({l / k, v});
                buckets[key].push_back({(r - c) / k + 1, (int)power(v)});
            }
        }
        for (auto &entry : buckets) {
            int k = entry.first / (b + 1), c = entry.first % (b + 1);
            vector<pair<int, int>> &events = entry.second;
            sort(events.begin(), events.end());
            int span = (n - 1 - c) / k + 1;
            long long acc = 1;
            int prev = 0;
            size_t i = 0;
            while (i < events.size()) {
                int pos = events[i].first;
                if (acc != 1) {
                    for (int p = prev; p < pos; p++) {
                        int &slot = nums[c + p * k];
                        slot = (int)((long long)slot * acc % MOD);
                    }
                }
                long long d = 1;
                while (i < events.size() && events[i].first == pos) {
                    d = d * events[i].second % MOD;
                    i++;
                }
                acc = acc * d % MOD;
                prev = pos;
            }
            if (acc != 1) {
                for (int p = prev; p < span; p++) {
                    int &slot = nums[c + p * k];
                    slot = (int)((long long)slot * acc % MOD);
                }
            }
        }
        int x = 0;
        for (int value : nums) {
            x ^= value;
        }
        return x;
    }
};
