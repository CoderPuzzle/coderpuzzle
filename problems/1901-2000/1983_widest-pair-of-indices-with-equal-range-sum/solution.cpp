class Solution {
  public:
    int widestPairOfIndices(vector<int> &nums1, vector<int> &nums2) {
        // Track the running prefix difference (sum1 - sum2); a range has
        // equal sums in both arrays iff the difference repeats. Seed the
        // empty prefix's value 0 at -1 so pairs starting at index 0 measure
        // correctly.
        unordered_map<int, int> first;
        first.reserve(nums1.size() * 2);
        first[0] = -1;
        int diff = 0;
        int best = 0;
        for (int i = 0; i < (int)nums1.size(); i++) {
            diff += nums1[i] - nums2[i];
            // A repeated difference spans a valid pair; keeping only each
            // value's FIRST occurrence maximizes every later span using it.
            auto it = first.find(diff);
            if (it != first.end()) {
                best = max(best, i - it->second);
            } else {
                first[diff] = i;
            }
        }
        return best;
    }
};
