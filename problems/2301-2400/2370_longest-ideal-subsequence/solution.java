class Solution {

    public int longestIdealString(String s, int k) {
        // best[c] = longest ideal subsequence so far ending with letter c.
        // Each character extends the best chain among letters within +/-k;
        // the window is at most 51 wide, so each step is constant time.
        int[] best = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            int c = s.charAt(i) - 'a';
            int lo = Math.max(0, c - k);
            int hi = Math.min(25, c + k);
            int candidate = 0;
            for (int d = lo; d <= hi; ++d) {
                candidate = Math.max(candidate, best[d]);
            }
            if (candidate + 1 > best[c]) {
                best[c] = candidate + 1;
            }
        }
        int answer = 0;
        for (int value : best) {
            answer = Math.max(answer, value);
        }
        return answer;
    }
}
