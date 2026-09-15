#include <algorithm>
#include <unordered_set>
#include <vector>

using namespace std;

class Solution {
  public:
    int divisibleGame(vector<int> &nums) {
        const long long mod = 1000000007;
        unordered_set<int> candidates;
        candidates.insert(2);
        for (int value : nums) {
            for (int divisor = 2; divisor * divisor <= value; ++divisor) {
                if (value % divisor == 0) {
                    candidates.insert(divisor);
                    candidates.insert(value / divisor);
                }
            }
            if (value > 1)
                candidates.insert(value);
        }

        long long bestScore = -4e18;
        int bestK = 0;
        for (int k : candidates) {
            long long score = -4e18;
            long long current = 0;
            for (int value : nums) {
                long long transformed = value % k == 0 ? value : -value;
                current = max(transformed, current + transformed);
                score = max(score, current);
            }
            if (score > bestScore || (score == bestScore && k < bestK)) {
                bestScore = score;
                bestK = k;
            }
        }
        long long answer = ((bestScore % mod + mod) % mod) * bestK % mod;
        return (int)answer;
    }
};
