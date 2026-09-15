#include <algorithm>
#include <vector>

class Solution {
  public:
    int minNumber(vector<int> &nums1, vector<int> &nums2) {
        // A shared digit admits a one-digit number; the smallest shared digit
        // then beats anything with more digits.
        bool present[10] = {};
        for (int d : nums2)
            present[d] = true;
        int common = 10;
        for (int d : nums1)
            if (present[d] && d < common)
                common = d;
        if (common < 10)
            return common;
        // No overlap: the answer has two digits, and the tens digit is just
        // whichever array holds the globally smaller minimum.
        int a = *min_element(nums1.begin(), nums1.end());
        int b = *min_element(nums2.begin(), nums2.end());
        return min(10 * a + b, 10 * b + a);
    }
};
