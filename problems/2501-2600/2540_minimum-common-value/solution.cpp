#include <vector>

class Solution {
  public:
    int getCommon(std::vector<int> &nums1, std::vector<int> &nums2) {
        // Both arrays ascend, so the front runner carrying the smaller
        // value can never match anything ahead on the other side: drop it
        // and repeat. The first tie is necessarily the smallest shared
        // value; a drained side proves no common element exists.
        std::size_t i = 0;
        std::size_t j = 0;
        while (i < nums1.size() && j < nums2.size()) {
            if (nums1[i] == nums2[j]) {
                return nums1[i];
            }
            if (nums1[i] < nums2[j]) {
                ++i;
            } else {
                ++j;
            }
        }
        return -1;
    }
};
