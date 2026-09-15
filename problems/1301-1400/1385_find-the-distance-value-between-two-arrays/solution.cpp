#include <algorithm>
#include <cstdlib>
#include <vector>

class Solution {
  public:
    int findTheDistanceValue(std::vector<int> &arr1, std::vector<int> &arr2, int d) {
        std::vector<int> sorted2(arr2);
        std::sort(sorted2.begin(), sorted2.end());
        int count = 0;
        for (int value : arr1) {
            auto it = std::lower_bound(sorted2.begin(), sorted2.end(), value);
            bool close = false;
            if (it != sorted2.end() && *it - value <= d)
                close = true;
            if (it != sorted2.begin() && value - *(it - 1) <= d)
                close = true;
            if (!close)
                count++;
        }
        return count;
    }
};
