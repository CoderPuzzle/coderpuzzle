#include <algorithm>
#include <numeric>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int getKth(int lo, int hi, int k) {
        // Memoized path replay: walk each value's Collatz chain, recording
        // the route until it lands on a value whose power is already known,
        // then back-fill the recorded path. Fully iterative, and shared
        // steps between values are computed once.
        std::unordered_map<long long, int> memo{{1, 0}};
        std::vector<int> values(hi - lo + 1);
        std::iota(values.begin(), values.end(), lo);
        auto powerOf = [&](int start) {
            long long x = start;
            std::vector<long long> path;
            while (memo.find(x) == memo.end()) {
                path.push_back(x);
                x = x % 2 == 0 ? x / 2 : 3 * x + 1;
            }
            int steps = memo[x];
            for (auto it = path.rbegin(); it != path.rend(); ++it) {
                ++steps;
                memo[*it] = steps;
            }
            return steps;
        };
        std::stable_sort(values.begin(), values.end(), [&](int a, int b) {
            int pa = powerOf(a);
            int pb = powerOf(b);
            if (pa != pb) {
                return pa < pb;
            }
            return a < b;
        });
        return values[k - 1];
    }
};
