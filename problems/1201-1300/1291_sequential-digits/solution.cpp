#include <string>
#include <vector>

class Solution {
  public:
    std::vector<int> sequentialDigits(int low, int high) {
        // A sequential number is fully determined by its first digit and
        // its length — at most 9 lengths x 9 starting digits minus the runs
        // that would pass 9. Slide a fixed-length window over "123456789"
        // for each length; every window cut is one candidate, already in
        // ascending order because longer windows only add larger values.
        const std::string digits = "123456789";
        std::vector<int> result;
        for (int length = 2; length <= 9; length++) {
            for (int start = 0; start + length <= 9; start++) {
                int value = std::stoi(digits.substr(start, length));
                if (value > high) {
                    break;
                }
                if (value >= low) {
                    result.push_back(value);
                }
            }
        }
        return result;
    }
};
