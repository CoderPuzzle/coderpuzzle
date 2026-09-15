class Solution {
  public:
    long long maximumSum(vector<int> &nums) {
        // Writing each index as (squarefree part) x (perfect square), the
        // product of two indices is a perfect square exactly when their
        // squarefree parts match — so complete subsets are precisely the
        // indices sharing one squarefree part. Sum per group, take the max;
        // singletons qualify since the pair condition is vacuous.
        unordered_map<int, long long> groups;
        for (int i = 1; i <= (int)nums.size(); i++) {
            groups[squarefreePart(i)] += nums[i - 1];
        }
        long long best = LLONG_MIN;
        for (auto &[key, v] : groups) {
            if (v > best)
                best = v;
        }
        return best;
    }

  private:
    int squarefreePart(int x) {
        // Product of primes with odd exponent in x, e.g. P(18) = 2. Trial
        // division suffices: only indices are factored. Anything surviving
        // the loop is one leftover prime with exponent one.
        int result = 1;
        int d = 2;
        while ((long long)d * d <= x) {
            if (x % d == 0) {
                int count = 0;
                while (x % d == 0) {
                    x /= d;
                    count++;
                }
                if (count % 2 == 1)
                    result *= d;
            }
            d++;
        }
        if (x > 1)
            result *= x;
        return result;
    }
};
