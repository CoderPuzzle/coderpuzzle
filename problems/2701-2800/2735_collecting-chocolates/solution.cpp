class Solution {
  public:
    long long minCost(vector<int> &nums, int x) {
        // Try every rotation count k in [0, n): after k operations, buying
        // type t costs nums[(t - k) mod n], so each step only adds one new
        // candidate price per type on top of the ones already seen.
        int n = nums.size();
        // cheapest[t] tracks the lowest price seen so far for type t; totals
        // reach about 2 * 10^12, so accumulate in long long.
        vector<long long> cheapest(nums.begin(), nums.end());
        long long answer = accumulate(cheapest.begin(), cheapest.end(), 0LL);
        for (int rotations = 1; rotations < n; ++rotations) {
            long long total = 0;
            for (int t = 0; t < n; ++t) {
                long long price = nums[(t - rotations + n) % n];
                if (price < cheapest[t]) {
                    cheapest[t] = price;
                }
                total += cheapest[t];
            }
            answer = min(answer, total + (long long)rotations * x);
        }
        return answer;
    }
};
