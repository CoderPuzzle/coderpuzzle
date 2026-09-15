class Solution {

    public String encode(String s) {
        int n = s.length();
        // dp[i][j] = shortest encoding of s[i..j]; growing interval lengths
        // guarantee every subinterval is solved before it is needed.
        String[][] dp = new String[n][n];
        for (int length = 1; length <= n; length++) {
            for (int i = 0; i + length <= n; i++) {
                int j = i + length - 1;
                String substr = s.substring(i, j + 1);
                // Candidate 1: keep the substring verbatim.
                String best = substr;
                // Candidate 2: split in two, concatenate optimal encodings.
                for (int k = i; k < j; k++) {
                    String candidate = dp[i][k] + dp[k + 1][j];
                    if (candidate.length() < best.length()) {
                        best = candidate;
                    }
                }
                String compression = null;
                // Candidate 3: k[pattern] when a period divides the
                // interval. Embedding the pattern's own encoding (not raw
                // text) gives nested forms like 4[2[a]] for free.
                for (int p = 1; p < length; p++) {
                    if (length % p == 0) {
                        String pattern = s.substring(i, i + p);
                        if (pattern.repeat(length / p).equals(substr)) {
                            String encoded = length / p + "[" + dp[i][i + p - 1] + "]";
                            if (compression == null || encoded.length() < compression.length()) {
                                compression = encoded;
                            }
                        }
                    }
                }
                // Encode only if strictly shorter — or tied against an
                // already-encoded best; a tie with the raw text keeps the
                // text ("aaa" stays "aaa", "aaaaa" becomes "5[a]").
                if (compression != null) {
                    if (
                        compression.length() < best.length() ||
                        (compression.length() == best.length() && !best.equals(substr))
                    ) {
                        best = compression;
                    }
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
}
