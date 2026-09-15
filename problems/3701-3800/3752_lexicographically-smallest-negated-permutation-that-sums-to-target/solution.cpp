class Solution {
  public:
    vector<int> lexSmallestNegatedPerm(int n, long long target) {
        // The all-positive baseline [1, 2, ..., n] sums to S. Negating x
        // lowers the sum by 2 * x, so target is reachable exactly when it
        // lies in [-S, S] with the same parity as S. S reaches ~5 * 10^9,
        // which overflows int — the deficit math runs in long long.
        long long total = 1LL * n * (n + 1) / 2;
        if (target < -total || target > total || (total - target) % 2 != 0) {
            return {};
        }
        long long deficit = (total - target) / 2;
        vector<bool> negated(n + 1, false);
        // Greedily negate the largest values first; this is what puts the
        // most negative element at the front of the answer.
        for (int value = n; value >= 1; --value) {
            if (value <= deficit) {
                negated[value] = true;
                deficit -= value;
            }
        }
        vector<int> result;
        result.reserve(n);
        for (int value = n; value >= 1; --value) {
            if (negated[value]) {
                result.push_back(-value);
            }
        }
        for (int value = 1; value <= n; ++value) {
            if (!negated[value]) {
                result.push_back(value);
            }
        }
        return result;
    }
};
