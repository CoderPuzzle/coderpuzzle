#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    long long maximumScore(vector<int> &nums, string s) {
        // Sweep left to right pushing every value as a candidate final
        // slot; the '1' met at index i claims the best slot offered so
        // far. The score peaks at 10^5 * 10^9 = 10^14, so it accumulates
        // in a long long.
        priority_queue<int> heap;
        long long answer = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            heap.push(nums[i]);
            if (s[i] == '1') {
                answer += heap.top();
                heap.pop();
            }
        }
        return answer;
    }
};
