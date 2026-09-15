#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    long long maxSubarraySum(vector<int> &nums, int k) {
        const long long NEG = -4e18;
        long long none = NEG, multiply = NEG, divide = NEG, done = NEG;
        long long answer = NEG;
        for (int value : nums) {
            long long multiplied = (long long)value * k;
            long long divided = value / k;
            long long prevNone = none, prevMultiply = multiply, prevDivide = divide, prevDone = done;
            none = max((long long)value, prevNone + value);
            multiply = max(multiplied, max(prevNone + multiplied, prevMultiply + multiplied));
            divide = max(divided, max(prevNone + divided, prevDivide + divided));
            done = max(prevMultiply + value, max(prevDivide + value, prevDone + value));
            answer = max(answer, max(none, max(multiply, max(divide, done))));
        }
        return answer;
    }
};
