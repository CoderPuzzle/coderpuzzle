#include <cstdlib>
#include <vector>

class Solution {
  public:
    int differenceOfSum(std::vector<int> &nums) {
        // One pass accumulates both sums at once; every element is at
        // least its own digit sum (equality only for single digits), and
        // the bounds (2000 elements of at most 2000) keep both totals
        // far inside int, so a single std::abs closes the case.
        int elementSum = 0;
        int digitSum = 0;
        for (int value : nums) {
            elementSum += value;
            while (value > 0) {
                digitSum += value % 10;
                value /= 10;
            }
        }
        return std::abs(elementSum - digitSum);
    }
};
