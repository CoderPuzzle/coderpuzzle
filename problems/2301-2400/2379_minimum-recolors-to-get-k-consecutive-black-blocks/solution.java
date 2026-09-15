class Solution {

    public int minimumRecolors(String blocks, int k) {
        // The answer is the window of k consecutive blocks containing the
        // fewest whites; a sliding window updates that count in O(1) as it
        // moves.
        int whites = 0;
        for (int i = 0; i < k; ++i) {
            if (blocks.charAt(i) == 'W') {
                ++whites;
            }
        }
        int best = whites;
        for (int right = k; right < blocks.length(); ++right) {
            if (blocks.charAt(right) == 'W') {
                ++whites;
            }
            if (blocks.charAt(right - k) == 'W') {
                --whites;
            }
            best = Math.min(best, whites);
        }
        return best;
    }
}
