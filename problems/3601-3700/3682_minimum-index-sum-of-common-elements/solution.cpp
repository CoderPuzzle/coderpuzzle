class Solution {
  public:
    int minimumSum(vector<int> &nums1, vector<int> &nums2) {
        // For a shared value the two indices are independent, so its best
        // good pair is its first occurrence in each array: minimizing i and
        // j separately minimizes i + j. Record every value's first index in
        // nums1, never overwriting an earlier one.
        unordered_map<int, int> first_index;
        for (int i = 0; i < (int)nums1.size(); ++i) {
            if (!first_index.count(nums1[i])) {
                first_index[nums1[i]] = i;
            }
        }
        // One pass over nums2: every value the map knows scores
        // first_index[nums2[j]] + j, and the smallest score wins. The flag
        // stays -1 when nothing matched.
        int best = -1;
        for (int j = 0; j < (int)nums2.size(); ++j) {
            auto found = first_index.find(nums2[j]);
            if (found != first_index.end()) {
                int total = found->second + j;
                if (best == -1 || total < best) {
                    best = total;
                }
            }
        }
        return best;
    }
};
