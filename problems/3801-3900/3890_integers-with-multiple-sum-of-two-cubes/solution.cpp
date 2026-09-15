#include <algorithm>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<int> findGoodIntegers(int n) {
        // The largest possible base is the integer cube root of n <= 10^9,
        // which is at most 1000.
        int limit = 0;
        while (1LL * (limit + 1) * (limit + 1) * (limit + 1) <= n) {
            limit++;
        }
        vector<long long> cubes(limit + 1);
        for (int i = 1; i <= limit; i++) {
            cubes[i] = 1LL * i * i * i;
        }
        unordered_map<long long, int> counts;
        for (int a = 1; a <= limit; a++) {
            if (cubes[a] + cubes[a] > n) {
                break;
            }
            for (int b = a; b <= limit; b++) {
                long long total = cubes[a] + cubes[b];
                if (total > n) {
                    break;
                }
                counts[total]++;
            }
        }
        // A value is good when at least two distinct pairs form it.
        vector<int> result;
        for (auto &entry : counts) {
            if (entry.second >= 2) {
                result.push_back((int)entry.first);
            }
        }
        sort(result.begin(), result.end());
        return result;
    }
};
