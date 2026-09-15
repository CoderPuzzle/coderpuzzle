class Solution {
  public:
    long long minSwaps(vector<int> &nums) {
        // Only parity matters. In any target alternating pattern the
        // k-th even (in current order) must land on the k-th even slot
        // — crossings among equal-parity elements never pay — and each
        // adjacent swap moves exactly one even by one position, so a
        // pattern's cost is the sum |even index - even slot| (the odds
        // mirror the evens). Try both patterns; a pattern is feasible
        // only when its even-slot count equals the even count, which
        // also encodes the |evenCnt - oddCnt| > 1 impossibility.
        // Accumulate in long long: costs approach n^2/8 ~ 1.25e9.
        int n = nums.size();
        vector<int> evens;
        evens.reserve(n);
        for (int i = 0; i < n; i++)
            if ((nums[i] & 1) == 0)
                evens.push_back(i);
        int k = evens.size();
        long long best = -1;
        for (int start = 0; start <= 1; start++) {
            if ((n - start + 1) / 2 != k)
                continue;
            long long cost = 0;
            for (int j = 0; j < k; j++)
                cost += abs(evens[j] - (start + 2 * j));
            if (best < 0 || cost < best)
                best = cost;
        }
        return best;
    }
};
