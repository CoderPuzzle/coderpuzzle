#include <algorithm>
#include <vector>

class Solution {
  public:
    // After sorting, each element can be raised to at most one more than
    // the previous; the answer is the running value min(prev + 1, v).
    int maximumElementAfterDecrementingAndRearranging(std::vector<int> &arr) {
        std::sort(arr.begin(), arr.end());
        int cur = 1;
        for (size_t i = 1; i < arr.size(); i++) {
            cur = std::min(cur + 1, arr[i]);
        }
        return cur;
    }
};
