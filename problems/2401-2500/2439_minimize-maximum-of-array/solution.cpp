class Solution {
  public:
    int minimizeArrayValue(vector<int> &nums) {
        // Value only moves leftward, so each prefix's max is at least its
        // ceiling average; the max over all prefixes is also achievable by
        // balancing each prefix to that ceiling.
        long long total = 0;
        int best = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            total += nums[i];
            // ceil(total / (i+1)) via integer arithmetic.
            long long candidate = (total + i) / (i + 1);
            if (candidate > best) {
                best = (int)candidate;
            }
        }
        return best;
    }
};
