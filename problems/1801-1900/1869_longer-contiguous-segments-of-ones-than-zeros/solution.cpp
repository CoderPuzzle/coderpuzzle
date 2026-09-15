class Solution {
  public:
    // One pass tracks the current run; each character's best run is
    // folded in on change and once more after the loop. A digit that
    // never appears keeps its best at 0, per the statement's rule.
    bool checkZeroOnes(string s) {
        int best[2] = {0, 0};
        char prev = ' ';
        int cur = 0;
        for (char ch : s) {
            if (ch == prev) {
                cur++;
            } else {
                if (prev == '0' || prev == '1') {
                    int &slot = best[prev - '0'];
                    if (cur > slot)
                        slot = cur;
                }
                cur = 1;
                prev = ch;
            }
        }
        if (prev == '0' || prev == '1') {
            int &slot = best[prev - '0'];
            if (cur > slot)
                slot = cur;
        }
        return best[1] > best[0];
    }
};
