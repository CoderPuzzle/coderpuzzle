class Solution {
  public:
    int numSub(string s) {
        // `run` tracks the length of the run of 1s ending at the current
        // position; adding it after each step accumulates n * (n + 1) / 2
        // for every completed run, one unit at a time. `total` is int64_t
        // so the running sum never overflows before the mod is applied.
        const int64_t MOD = 1'000'000'007;
        int64_t total = 0;
        int64_t run = 0;
        for (char c : s) {
            run = c == '1' ? run + 1 : 0;
            total = (total + run) % MOD;
        }
        return static_cast<int>(total);
    }
};
