#include <vector>

using namespace std;

class Solution {
  public:
    long long minArraySum(vector<int> &nums) {
        const int limit = 100000;
        vector<bool> present(limit + 1, false);
        for (int value : nums)
            present[value] = true;

        vector<int> best(limit + 1, 0);
        for (int divisor = 1; divisor <= limit; ++divisor) {
            if (!present[divisor])
                continue;
            for (int multiple = divisor; multiple <= limit; multiple += divisor) {
                if (present[multiple] && (best[multiple] == 0 || divisor < best[multiple]))
                    best[multiple] = divisor;
            }
        }

        long long answer = 0;
        for (int value : nums)
            answer += best[value];
        return answer;
    }
};
