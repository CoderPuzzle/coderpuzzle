class Solution {

    private static final int MOD = 1_000_000_007;

    public int numSub(String s) {
        // `run` tracks the length of the run of 1s ending at the current
        // position; adding it after each step accumulates n * (n + 1) / 2
        // for every completed run, one unit at a time. `total` is a long
        // so the running sum never overflows before the mod is applied.
        long total = 0;
        int run = 0;
        for (int i = 0; i < s.length(); i++) {
            run = s.charAt(i) == '1' ? run + 1 : 0;
            total = (total + run) % MOD;
        }
        return (int) total;
    }
}
