#include <numeric>
#include <vector>

class Solution {
  public:
    int minOperations(vector<int> &nums, vector<int> &numsDivide) {
        // An element x can head nums only if it divides every value in
        // numsDivide; one common divisor divides their GCD, so reduce the
        // target once and count the sorted elements below the smallest
        // divisor of it.
        int g = 0;
        for (int value : numsDivide) {
            g = std::gcd(g, value);
        }
        std::sort(nums.begin(), nums.end());
        int deletions = 0;
        for (int value : nums) {
            if (g % value == 0) {
                return deletions;
            }
            ++deletions;
        }
        return -1;
    }
};
