#include <string>

class Solution {
  public:
    bool sumGame(std::string num) {
        // Track f = 2*diff + 9*k where diff is (left sum - right sum) over
        // fixed digits and k = (#'?' left) - (#'?' right). Every fill changes
        // f by an odd offset in [-9, 9] regardless of side. Alice wins iff
        // f != 0: she pushes +9 each turn, Bob can cancel at most -9 per
        // reply, and Bob holds f at 0 by mirroring whenever it starts there.
        long long diff = 0;
        long long k = 0;
        int n = static_cast<int>(num.size());
        for (int i = 0; i < n; ++i) {
            char ch = num[i];
            if (ch == '?') {
                k += (i < n / 2) ? 1 : -1;
            } else {
                int d = ch - '0';
                diff += (i < n / 2) ? d : -d;
            }
        }
        return 2 * diff + 9 * k != 0;
    }
};
