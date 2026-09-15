class Solution {
  public:
    int countBalls(int lowLimit, int highLimit) {
        // Ball x is filed into box digit_sum(x), and with highLimit <= 10^5
        // no digit sum exceeds 45 (99999 -> 45), so a 46-slot counter
        // indexed by digit sum covers every box the range can reach.
        // Sweep once, strip digits with % 10 and / 10 (an inner copy keeps
        // the loop variable intact), bump the named slot, and answer with
        // the fullest slot.
        vector<int> counts(46, 0);
        for (int x = lowLimit; x <= highLimit; ++x) {
            int s = 0;
            for (int v = x; v > 0; v /= 10) {
                s += v % 10;
            }
            counts[s]++;
        }
        return *max_element(counts.begin(), counts.end());
    }
};
