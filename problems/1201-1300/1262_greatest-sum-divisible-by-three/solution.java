class Solution {

    public int maxSumDivThree(int[] nums) {
        // best[r]: greatest prefix sum with sum % 3 == r (-1 = unreachable).
        final int NEG = -1;
        int[] best = { 0, NEG, NEG };
        for (int x : nums) {
            int[] candidate = best.clone();
            for (int r = 0; r < 3; ++r) {
                if (best[r] != NEG) {
                    int nr = (r + x) % 3;
                    if (best[r] + x > candidate[nr]) {
                        candidate[nr] = best[r] + x;
                    }
                }
            }
            best = candidate;
        }
        return best[0];
    }
}
