#include <algorithm>
#include <vector>

class Solution {
  public:
    // Two pointers: as i grows, nums1[i] shrinks, so the farthest usable j
    // never moves left. Advance j as far as validity allows.
    int maxDistance(std::vector<int> &nums1, std::vector<int> &nums2) {
        int best = 0;
        int j = 0;
        int n1 = nums1.size(), n2 = nums2.size();
        for (int i = 0; i < n1; i++) {
            while (j < n2 && (j < i || nums2[j] >= nums1[i])) {
                j++;
            }
            if (j > i && nums2[j - 1] >= nums1[i]) {
                best = std::max(best, j - 1 - i);
            }
        }
        return best;
    }
};
