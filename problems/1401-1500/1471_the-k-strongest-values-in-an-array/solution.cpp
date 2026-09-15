#include <algorithm>
#include <cstdlib>
#include <vector>

class Solution {
  public:
    std::vector<int> getStrongest(std::vector<int> &arr, int k) {
        std::vector<int> sortedArr = arr;
        std::sort(sortedArr.begin(), sortedArr.end());
        int m = sortedArr[(arr.size() - 1) / 2];
        std::sort(arr.begin(), arr.end(), [m](int a, int b) {
            long long da = llabs(static_cast<long long>(a) - m);
            long long db = llabs(static_cast<long long>(b) - m);
            if (da != db) {
                return da > db;
            }
            return a > b;
        });
        arr.resize(k);
        return arr;
    }
};
