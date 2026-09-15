class Solution {
  public:
    int rob(vector<int> &nums) {
        // Rolling two-variable DP: cur = best through house i-1, prev = best
        // through house i-2; both start at 0 ("nothing robbed yet").
        long long prev = 0, cur = 0;
        for (int x : nums) {
            // Skip this house (keep cur) or rob it (prev + x).
            long long next = max(cur, prev + x);
            prev = cur;
            cur = next;
        }
        return (int)cur;
    }
};
