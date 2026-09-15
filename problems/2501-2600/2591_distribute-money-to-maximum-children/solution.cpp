#include <algorithm>

class Solution {
  public:
    int distMoney(int money, int children) {
        // Seed every child with 1 dollar first; a child then lands on
        // exactly 8 iff it absorbs exactly 7 more. Peel whole children off
        // into eights from the top while the leftover change can still be
        // absorbed by the rest: it fails only when a single child must
        // take exactly 3 extra (a forbidden final 4) or nobody is left to
        // take any at all.
        if (money < children) {
            return -1;
        }
        int rest = money - children;
        int k = std::min(rest / 7, children);
        for (;;) {
            int leftover = rest - 7 * k;
            int pool = children - k;
            if ((pool == 0 && leftover == 0) || (pool >= 1 && !(pool == 1 && leftover == 3))) {
                return k;
            }
            --k;
        }
    }
};
