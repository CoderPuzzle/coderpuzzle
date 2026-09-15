#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    int minOperations(vector<int> &nums, int k) {
        vector<int> remainders;
        for (int value : nums)
            remainders.push_back(value % k);
        int answer = 1000000000;
        for (int x = 0; x < k; ++x) {
            for (int y = 0; y < k; ++y) {
                if (x == y)
                    continue;
                int total = 0;
                for (int i = 0; i < (int)remainders.size(); ++i) {
                    int target = i % 2 == 0 ? x : y;
                    int current = remainders[i];
                    total += min((target - current + k) % k, (current - target + k) % k);
                }
                answer = min(answer, total);
            }
        }
        return answer;
    }
};
