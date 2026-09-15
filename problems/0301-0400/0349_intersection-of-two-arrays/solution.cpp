class Solution {
  public:
    vector<int> intersection(vector<int> &nums1, vector<int> &nums2) {
        // The set does the uniqueness bookkeeping: hashing nums1's values
        // answers "is this value shared?" in O(1) average, and collecting
        // the hits into a second set collapses the duplicates both inputs
        // carry, so each shared value is kept exactly once.
        unordered_set<int> seen(nums1.begin(), nums1.end());
        unordered_set<int> shared;
        for (int value : nums2) {
            if (seen.count(value)) {
                shared.insert(value);
            }
        }
        vector<int> result(shared.begin(), shared.end());
        // The final sort pins the output to the ascending order the judge
        // compares exactly.
        sort(result.begin(), result.end());
        return result;
    }
};
