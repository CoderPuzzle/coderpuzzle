class Solution {
  public:
    vector<int> pairSum(vector<int> &nums, int target) {
        // Hash map from value -> index: one pass answers "seen the complement?"
        // in O(1), replacing the nested brute-force scan.
        unordered_map<int, int> seen;
        for (int index = 0; index < (int)nums.size(); ++index) {
            // Look up before inserting, so an element can never match itself
            // and the two returned indices are guaranteed distinct.
            auto found = seen.find(target - nums[index]);
            if (found != seen.end())
                return {found->second, index};
            seen[nums[index]] = index;
        }
        return {};
    }
};
