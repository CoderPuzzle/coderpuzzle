class Solution {
  public:
    bool containsDuplicate(vector<int> &nums) {
        // One pass with a set of already-visited values.
        unordered_set<int> seen;
        for (int value : nums) {
            // insert() returns false when the value was already present,
            // i.e. this is its second occurrence.
            if (!seen.insert(value).second) {
                return true;
            }
        }
        // Loop finished: every element was distinct at insertion time.
        return false;
    }
};
