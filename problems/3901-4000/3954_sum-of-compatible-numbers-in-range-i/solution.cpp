#include <algorithm>
using namespace std;
class Solution {
  public:
    int sumOfGoodIntegers(int n, int k) {
        int s = 0;
        for (int x = max(1, n - k); x <= n + k; x++)
            if (!(n & x))
                s += x;
        return s;
    }
};
