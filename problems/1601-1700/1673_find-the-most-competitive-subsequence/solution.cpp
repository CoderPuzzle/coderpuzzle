class Solution {
  public:
    vector<int> mostCompetitive(vector<int> &nums, int k) {
        // "Most competitive" is the lexicographically smallest length-k
        // subsequence — build it as a non-decreasing stack in one pass.
        vector<int> stack;
        stack.reserve(k);
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            int value = nums[i];
            int remaining = n - i;
            // Drop strictly larger tops while enough unread values remain
            // to refill to k; the strict > keeps the earlier of equal
            // values, which changes nothing lexicographically.
            while (!stack.empty() && stack.back() > value && (int)stack.size() + remaining > k) {
                stack.pop_back();
            }
            // Append only while there is room; a full stack can only
            // change through eviction above.
            if ((int)stack.size() < k) {
                stack.push_back(value);
            }
        }
        return stack;
    }
};
