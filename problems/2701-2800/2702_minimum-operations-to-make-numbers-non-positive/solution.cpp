#include <vector>

using namespace std;

class Solution {
  public:
    // After t operations index i has absorbed t*y of decrement plus an
    // extra (x - y) every time it was picked, so candidate t is feasible
    // iff the required picks fit inside the t operations. The running
    // pick total can pass INT_MAX before the early exit fires, so
    // products and the accumulator stay in 64-bit.
    bool feasible(const vector<int> &nums, long long t, long long x, long long y) {
        long long base = t * y;
        long long gain = x - y;
        long long used = 0;
        for (int value : nums) {
            if (value > base) {
                used += (value - base + gain - 1) / gain;
                if (used > t) {
                    return false;
                }
            }
        }
        return true;
    }

  public:
    int minOperations(vector<int> &nums, int x, int y) {
        int max_value = 0;
        for (int value : nums) {
            max_value = max(max_value, value);
        }
        long long low = 1;
        long long high = (static_cast<long long>(max_value) + y - 1) / y; // ceil(max_value / y)
        while (low < high) {
            long long mid = low + (high - low) / 2;
            if (feasible(nums, mid, x, y)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return static_cast<int>(low);
    }
};
