#include <algorithm>
#include <vector>

class Solution {
  public:
    int maxNumberOfApples(std::vector<int> &weight) {
        // Lightest apples first: any optimal packing can be assumed to
        // consist of them, so a sorted greedy prefix is exactly optimal.
        std::sort(weight.begin(), weight.end());
        long long total = 0;
        for (int i = 0; i < (int)weight.size(); i++) {
            if (total + weight[i] > 5000) {
                return i;
            }
            total += weight[i];
        }
        return (int)weight.size();
    }
};
