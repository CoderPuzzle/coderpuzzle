#include <vector>

class Solution {
  public:
    vector<vector<int>> mergeArrays(vector<vector<int>> &nums1, vector<vector<int>> &nums2) {
        // Both inputs are sorted by id, so two pointers walk them in
        // lockstep, always emitting the smaller head id next: shared ids
        // merge their values, single-side ids pass through unchanged. The
        // result is sorted by construction and holds each id once.
        vector<vector<int>> merged;
        size_t i = 0, j = 0;
        while (i < nums1.size() && j < nums2.size()) {
            if (nums1[i][0] == nums2[j][0]) {
                merged.push_back({nums1[i][0], nums1[i][1] + nums2[j][1]});
                ++i;
                ++j;
            } else if (nums1[i][0] < nums2[j][0]) {
                merged.push_back(nums1[i]);
                ++i;
            } else {
                merged.push_back(nums2[j]);
                ++j;
            }
        }
        // One tail is empty here; the other carries its remaining rows.
        for (; i < nums1.size(); ++i)
            merged.push_back(nums1[i]);
        for (; j < nums2.size(); ++j)
            merged.push_back(nums2[j]);
        return merged;
    }
};
