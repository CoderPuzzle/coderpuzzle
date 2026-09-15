class Solution {
  public:
    vector<int> lastVisitedIntegers(vector<int> &nums) {
        // seen holds the positives with the most recent one at the front; k
        // counts consecutive -1s and every positive resets it, so each -1
        // either reads the k-th element from the front of seen — the k-th
        // most recent positive — or appends -1 when seen is too short.
        vector<int> seen;
        vector<int> ans;
        int k = 0;
        for (int num : nums) {
            if (num != -1) {
                seen.insert(seen.begin(), num);
                k = 0;
            } else {
                ++k;
                ans.push_back(k <= (int)seen.size() ? seen[k - 1] : -1);
            }
        }
        return ans;
    }
};
