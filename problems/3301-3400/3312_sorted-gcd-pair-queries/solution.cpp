class Solution {
  public:
    vector<int> gcdValues(vector<int> &nums, vector<long long> &queries) {
        int maxValue = 0;
        for (int value : nums) {
            maxValue = max(maxValue, value);
        }
        vector<int> freq(maxValue + 1, 0);
        for (int value : nums) {
            freq[value]++;
        }
        // pairs_with_gcd[d]: pairs whose gcd is exactly d. Processing d from
        // maxValue down, pairs sharing divisor d minus the already-fixed
        // exact counts of every proper multiple of d (inclusion-exclusion).
        // Pair counts reach n * (n - 1) / 2 ~= 5 * 10^9, past int range.
        vector<long long> exact(maxValue + 1, 0);
        for (int d = maxValue; d >= 1; d--) {
            long long count = 0;
            for (int multiple = d; multiple <= maxValue; multiple += d) {
                count += freq[multiple];
            }
            long long pairs = count * (count - 1) / 2;
            for (int multiple = 2 * d; multiple <= maxValue; multiple += d) {
                pairs -= exact[multiple];
            }
            exact[d] = pairs;
        }
        vector<long long> prefix(maxValue + 1, 0);
        long long running = 0;
        for (int d = 1; d <= maxValue; d++) {
            running += exact[d];
            prefix[d] = running;
        }
        // Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9 and arrive as
        // long longs; each answer is a gcd, at most 5 * 10^4.
        vector<int> answer(queries.size());
        for (int i = 0; i < (int)queries.size(); i++) {
            int lo = 1;
            int hi = maxValue;
            long long target = queries[i] + 1;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (prefix[mid] >= target) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            answer[i] = lo;
        }
        return answer;
    }
};
