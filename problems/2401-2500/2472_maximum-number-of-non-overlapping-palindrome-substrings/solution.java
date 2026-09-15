import java.util.Arrays;

class Solution {

    public int maxPalindromes(String s, int k) {
        // For each end index r, best[r] is the largest start l of a
        // palindrome s[l..r] with length at least k. Among all palindromes
        // ending at r, the one starting latest leaves the most room on the
        // left and reaches the biggest dp[l], since dp never decreases.
        int n = s.length();
        int[] best = new int[n];
        Arrays.fill(best, -1);
        for (int center = 0; center < n; center++) {
            int l = center;
            int r = center;
            while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
                if (r - l + 1 >= k && l > best[r]) {
                    best[r] = l;
                }
                l--;
                r++;
            }
        }
        for (int center = 0; center + 1 < n; center++) {
            int l = center;
            int r = center + 1;
            while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
                if (r - l + 1 >= k && l > best[r]) {
                    best[r] = l;
                }
                l--;
                r++;
            }
        }
        // dp[i] = answer for the prefix s[0..i-1]; either skip index i-1 or
        // take the latest-starting palindrome that ends there.
        int[] dp = new int[n + 1];
        for (int r = 0; r < n; r++) {
            dp[r + 1] = dp[r];
            int l = best[r];
            if (l != -1 && dp[l] + 1 > dp[r + 1]) {
                dp[r + 1] = dp[l] + 1;
            }
        }
        return dp[n];
    }
}
