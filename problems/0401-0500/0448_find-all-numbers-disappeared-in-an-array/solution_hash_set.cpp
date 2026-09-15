class Solution {
  public:
    vector<int> findDisappearedNumbers(vector<int> &nums) {
        // The direct reading: record every value in a hash set, then walk the
        // candidate range 1..n and keep the values the set does not hold.
        unordered_set<int> seen(nums.begin(), nums.end());
        // The set carries no order of its own; walking the candidates in
        // increasing order is what makes the pinned ascending output free.
        vector<int> disappeared;
        for (int value = 1; value <= (int)nums.size(); ++value) {
            if (!seen.count(value)) {
                disappeared.push_back(value);
            }
        }
        return disappeared;
    }
};
