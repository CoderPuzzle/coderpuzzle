class Solution {

    public int countHomogenous(String s) {
        // Each position is charged with the number of homogenous
        // substrings ending there — the current run length — so the
        // running total realizes the per-run triangle sums directly.
        final int MOD = 1_000_000_007;
        long total = 0;
        int run = 0;
        char prev = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            run = c == prev ? run + 1 : 1;
            prev = c;
            total = (total + run) % MOD;
        }
        return (int) total;
    }
}
