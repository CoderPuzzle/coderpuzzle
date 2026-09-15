#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maxPoints(vector<int> &technique1, vector<int> &technique2, int k) {
        // Taking technique 1 everywhere satisfies any k, so start there and
        // switch tasks to technique 2 in descending order of the gain
        // technique2[i] - technique1[i], never exceeding n - k switches.
        // A switch only helps while its gain is positive; because gains
        // arrive largest-first, every prefix is the best use of that many
        // switches, so the answer is the running maximum over those totals.
        long long total = 0;
        for (int a : technique1) {
            total += a;
        }
        long long best = total;
        vector<long long> gains;
        gains.reserve(technique1.size());
        for (size_t i = 0; i < technique1.size(); ++i) {
            gains.push_back((long long)technique2[i] - technique1[i]);
        }
        sort(gains.begin(), gains.end(), greater<long long>());
        int budget = (int)technique1.size() - k;
        for (long long gain : gains) {
            if (budget == 0 || gain <= 0) {
                break;
            }
            total += gain;
            --budget;
            best = max(best, total);
        }
        return best;
    }
};
