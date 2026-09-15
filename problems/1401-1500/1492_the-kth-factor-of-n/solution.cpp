#include <vector>

class Solution {
  public:
    int kthFactor(int n, int k) {
        std::vector<int> small;
        int i = 1;
        while ((long long)i * i <= n) {
            if (n % i == 0) {
                small.push_back(i);
                if ((int)small.size() == k) {
                    return i;
                }
            }
            ++i;
        }
        int count = (int)small.size();
        bool perfectSquare = (long long)(i - 1) * (i - 1) == n && n % (i - 1) == 0;
        int total = perfectSquare ? 2 * count - 1 : 2 * count;
        if (k > total) {
            return -1;
        }
        return n / small[total - k];
    }
};
