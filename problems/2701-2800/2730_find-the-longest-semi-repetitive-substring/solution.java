class Solution {

    public int longestSemiRepetitiveSubstring(String s) {
        int best = 0;
        int left = 0;
        int pairs = 0;
        for (int right = 0; right < s.length(); right++) {
            if (right > 0 && s.charAt(right) == s.charAt(right - 1)) {
                pairs++;
            }
            while (pairs > 1) {
                if (s.charAt(left) == s.charAt(left + 1)) {
                    pairs--;
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
