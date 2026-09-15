class Solution {
  public:
    int maximumLength(vector<int> &nums) {
        // Only parities matter: a valid subsequence either never changes
        // parity (all adjacent sums even) or flips parity on every step
        // (all adjacent sums odd). Those are exactly four target shapes --
        // all-even, all-odd, alternating from even, alternating from odd.
        // For each shape sweep nums once keeping its next wanted parity
        // and take the earliest match, which never forgoes a later slot.
        int best = 0;
        for (int start = 0; start <= 1; start++) {
            for (int shape = 0; shape <= 1; shape++) {
                bool alternate = shape == 1;
                int want = start;
                int length = 0;
                for (int value : nums) {
                    if ((value & 1) == want) {
                        length++;
                        if (alternate) {
                            want ^= 1;
                        }
                    }
                }
                best = max(best, length);
            }
        }
        return best;
    }
};
