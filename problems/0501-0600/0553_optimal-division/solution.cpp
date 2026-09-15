#include <string>
#include <vector>

class Solution {
  public:
    string optimalDivision(vector<int> &nums) {
        // One or two values leave nothing to regroup, so the bare
        // left-to-right join is the whole answer. From three on, every value
        // is positive and the expression is maximized by dividing nums[0] by
        // the smallest possible denominator — the flat chain
        // a1/a2/.../an-1 = a1/(a2*...*an-1), which pulls every later value
        // into that denominator's numerator.
        string rest;
        for (size_t i = 1; i < nums.size(); ++i) {
            if (i > 1)
                rest += '/';
            rest += to_string(nums[i]);
        }
        if (nums.size() <= 2) {
            return nums.size() == 1 ? to_string(nums[0]) : to_string(nums[0]) + "/" + rest;
        }
        return to_string(nums[0]) + "/(" + rest + ")";
    }
};
