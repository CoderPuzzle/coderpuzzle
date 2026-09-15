class Solution {

    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        if (n == 0) return 0;
        // A mirror reads the same both ways, so it survives reversing
        // the string: the answer is the longest common subsequence of
        // s and its reversal. Each row of that table reads only the
        // row above, so two rows carry the whole computation.
        String t = new StringBuilder(s).reverse().toString();
        int[] prev = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int[] curr = new int[n + 1];
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    // Agreeing first letters open a common
                    // subsequence built from the two remainders.
                    curr[j] = prev[j - 1] + 1;
                } else {
                    // At least one of the two first letters is
                    // absent from an optimal common subsequence.
                    curr[j] = Math.max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        return prev[n];
    }
}
