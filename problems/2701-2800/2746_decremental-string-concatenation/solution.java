class Solution {

    public int minimizeConcatenatedLength(String[] words) {
        // dp[first][last] = shortest length of a concatenation of the words
        // processed so far starting with `first` and ending with `last`.
        final int INF = Integer.MAX_VALUE;
        int[][] dp = new int[26][26];
        for (int f = 0; f < 26; f++) {
            for (int l = 0; l < 26; l++) {
                dp[f][l] = INF;
            }
        }
        String firstWord = words[0];
        dp[firstWord.charAt(0) - 'a'][firstWord.charAt(firstWord.length() - 1) - 'a'] = firstWord.length();
        for (int i = 1; i < words.length; i++) {
            String word = words[i];
            int wordFirst = word.charAt(0) - 'a';
            int wordLast = word.charAt(word.length() - 1) - 'a';
            int length = word.length();
            int[][] ndp = new int[26][26];
            for (int f = 0; f < 26; f++) {
                for (int l = 0; l < 26; l++) {
                    ndp[f][l] = INF;
                }
            }
            for (int f = 0; f < 26; f++) {
                for (int l = 0; l < 26; l++) {
                    int current = dp[f][l];
                    if (current == INF) {
                        continue;
                    }
                    // Append on the right: seam merges when our last char
                    // equals the word's first char.
                    int appended = current + length;
                    if (l == wordFirst) {
                        appended--;
                    }
                    if (appended < ndp[f][wordLast]) {
                        ndp[f][wordLast] = appended;
                    }
                    // Prepend on the left: seam merges when the word's last
                    // char equals our first char.
                    int prepended = current + length;
                    if (wordLast == f) {
                        prepended--;
                    }
                    if (prepended < ndp[wordFirst][l]) {
                        ndp[wordFirst][l] = prepended;
                    }
                }
            }
            dp = ndp;
        }
        int best = INF;
        for (int[] row : dp) {
            for (int value : row) {
                best = Math.min(best, value);
            }
        }
        return best;
    }
}
