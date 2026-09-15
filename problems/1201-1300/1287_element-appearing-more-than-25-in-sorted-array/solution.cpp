#include <algorithm>
#include <vector>

class Solution {
  public:
    int findSpecialInteger(std::vector<int> &arr) {
        // A value covering more than a quarter of the array must span at
        // least one of the positions n/4, n/2, 3n/4 (a run longer than n/4
        // cannot fit between two consecutive quarter marks). Each candidate
        // is verified by binary-searching its first and last occurrence.
        int n = static_cast<int>(arr.size());
        for (int probe : {n / 4, n / 2, 3 * n / 4}) {
            int candidate = arr[probe];
            auto lo = std::lower_bound(arr.begin(), arr.end(), candidate);
            auto hi = std::upper_bound(arr.begin(), arr.end(), candidate);
            if (hi - lo > n / 4) {
                return candidate;
            }
        }
        return arr[n - 1];
    }
};
