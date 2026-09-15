class Solution {
  public:
    long long countPairs(vector<int> &nums, int k) {
        // Bucket by g = gcd(num, k): the gcd strips every factor of num
        // irrelevant to divisibility by k, and num_i * num_j is divisible
        // by k exactly when (gi * gj) % k == 0. Each g divides k, so there
        // are at most d(k) groups.
        unordered_map<long long, long long> counts;
        for (int num : nums) {
            counts[gcd(num, k)]++;
        }

        long long total = 0;
        vector<long long> gs;
        gs.reserve(counts.size());
        for (const auto &[g, c] : counts) {
            gs.push_back(g);
        }
        // Pair every two groups (a group with itself included).
        for (size_t i = 0; i < gs.size(); i++) {
            for (size_t j = i; j < gs.size(); j++) {
                if (gs[i] * gs[j] % k != 0) {
                    continue;
                }
                if (i == j) {
                    // Index pairs i < j inside one group: C(c, 2).
                    long long c = counts[gs[i]];
                    total += c * (c - 1) / 2;
                } else {
                    total += counts[gs[i]] * counts[gs[j]];
                }
            }
        }
        return total;
    }
};
