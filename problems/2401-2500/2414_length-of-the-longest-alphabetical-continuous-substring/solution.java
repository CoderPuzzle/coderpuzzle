class Solution {

    public int longestContinuousSubstring(String s) {
        int best = 1;
        int run = 1;
        for (int i = 1; i < s.length(); i++) {
            run = s.charAt(i) == s.charAt(i - 1) + 1 ? run + 1 : 1;
            best = Math.max(best, run);
        }
        return best;
    }
}
