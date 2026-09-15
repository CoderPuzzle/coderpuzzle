class Solution {
  public:
    bool checkIfExist(vector<int> &arr) {
        // Insert after the lookup so an element can never match itself.
        unordered_set<int> seen;
        for (int value : arr) {
            if (seen.count(2 * value) || (value % 2 == 0 && seen.count(value / 2))) {
                return true;
            }
            seen.insert(value);
        }
        return false;
    }
};
