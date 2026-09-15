#include <vector>

using namespace std;

class Solution {
  public:
    int minAdjacentSwaps(vector<int> &nums, int a, int b) {
        const long long mod = 1000000007;
        long long counts[3] = {};
        long long answer = 0;
        for (int value : nums) {
            int group = value < a ? 0 : value <= b ? 1 : 2;
            if (group == 0)
                answer += counts[1] + counts[2];
            else if (group == 1)
                answer += counts[2];
            ++counts[group];
        }
        return answer % mod;
    }
};
