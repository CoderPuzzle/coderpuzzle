class Solution {
  public:
    int findMaxLength(vector<int> &nums) {
        // Treat 0 as -1 and 1 as +1 and carry the running balance: equal
        // counts cancel, so a repeated balance at i < j bounds an
        // equal-count subarray of length j - i. Keep only the FIRST index
        // of each balance (0 seeded at -1) so every repeat stretches its
        // window as far as possible.
        unordered_map<int, int> first;
        first[0] = -1;
        int best = 0, balance = 0;
        for (int index = 0; index < (int)nums.size(); ++index) {
            balance += nums[index] == 1 ? 1 : -1;
            auto found = first.find(balance);
            if (found != first.end())
                best = max(best, index - found->second);
            else
                first[balance] = index;
        }
        return best;
    }
};
