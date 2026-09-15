#include <unordered_map>
#include <vector>

class Solution {
  public:
    int duplicateNumbersXOR(std::vector<int> &nums) {
        // One pass with a value -> count tally; values seen exactly twice
        // contribute to the XOR. XOR is its own inverse and self-canceling,
        // so values occurring once must be excluded by the count, not
        // folded in blindly. Values are bounded by 50 here; an int suffices.
        std::unordered_map<int, int> counts;
        for (int value : nums)
            ++counts[value];
        int answer = 0;
        for (const auto &[value, count] : counts) {
            if (count == 2)
                answer ^= value;
        }
        return answer;
    }
};
