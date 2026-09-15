class Solution {
  public:
    // Splits target into k full copies plus a remainder: any n consecutive
    // elements of the infinite array sum to total, so a remainder hit is a
    // window of length < n with sum rem, and one doubled copy contains
    // every such window for every start phase. Prefix sums reach
    // 2 * sum(nums) = 2 * 10^10, past int range, so they accumulate in
    // long long; the answer itself stays below k * n + 2n <=
    // target + 2 * 10^5 < 2^31.
    int minSizeSubarray(vector<int> &nums, int target) {
        const long long total = accumulate(nums.begin(), nums.end(), 0LL);
        const int n = static_cast<int>(nums.size());
        const long long k = target / total;
        const long long rem = target % total;
        if (rem == 0) {
            return static_cast<int>(k * n);
        }
        unordered_map<long long, int> first;
        first[0] = -1;
        long long pre = 0;
        int best = -1;
        for (int i = 0; i < 2 * n; ++i) {
            pre += nums[i % n];
            const auto it = first.find(pre - rem);
            if (it != first.end() && (best < 0 || i - it->second < best)) {
                best = i - it->second;
            }
            first.emplace(pre, i);
        }
        return best < 0 ? -1 : static_cast<int>(k * n + best);
    }
};
