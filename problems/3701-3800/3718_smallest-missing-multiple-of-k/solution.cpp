class Solution {
  public:
    int missingMultiple(vector<int> &nums, int k) {
        // The question is pure membership: drop every value into a hash set,
        // then walk the multiples of k upward until one is absent.
        unordered_set<int> seen(nums.begin(), nums.end());
        int candidate = k;
        while (seen.count(candidate) > 0) {
            candidate += k;
        }
        return candidate;
    }
};
