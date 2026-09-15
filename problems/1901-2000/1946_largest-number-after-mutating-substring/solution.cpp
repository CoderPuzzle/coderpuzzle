class Solution {
  public:
    string maximumNumber(string num, vector<int> &change) {
        // Greedy: the leftmost digit change strictly improves is where the
        // mutation must start -- an earlier digit is more significant, so
        // improving it dominates any later start. Extend through every
        // non-hurting digit (change[d] >= d) and stop at the first hurting
        // one, since the mutated substring must stay contiguous.
        bool started = false;
        for (int i = 0; i < (int)num.size(); ++i) {
            int d = num[i] - '0';
            if (change[d] > d) {
                started = true;
                num[i] = (char)('0' + change[d]);
            } else if (change[d] < d && started) {
                break;
            }
        }
        return num;
    }
};
