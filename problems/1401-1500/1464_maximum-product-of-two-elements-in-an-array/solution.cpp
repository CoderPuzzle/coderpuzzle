#include <vector>

class Solution {
  public:
    int maxProduct(std::vector<int> &nums) {
        int first = 0;
        int second = 0;
        for (int value : nums) {
            if (value > first) {
                second = first;
                first = value;
            } else if (value > second) {
                second = value;
            }
        }
        return (first - 1) * (second - 1);
    }
};
