class Solution {
  public:
    int maxTurbulenceSize(vector<int> &arr) {
        // Single sweep with a running sign state: a comparison that flips
        // the previous sign extends the turbulent run, a repeat or an
        // equal pair restarts it at the appropriate short length.
        int best = 1;
        int run = 1;
        int prev_sign = 0; // sign of the previous comparison: -1, 0, or 1
        int n = arr.size();
        for (int i = 1; i < n; i++) {
            int sign;
            if (arr[i] > arr[i - 1]) {
                sign = 1;
            } else if (arr[i] < arr[i - 1]) {
                sign = -1;
            } else {
                sign = 0;
            }
            if (sign == 0) {
                run = 1;
            } else if (sign == -prev_sign) {
                ++run;
            } else {
                run = 2;
            }
            prev_sign = sign;
            // A run only reaches its full length at its last element, so
            // tracking the best while it grows misses nothing.
            best = max(best, run);
        }
        return best;
    }
};
