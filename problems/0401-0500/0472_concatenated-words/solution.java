import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String[] findAllConcatenatedWordsInADict(String[] words) {
        Set<String> dictionary = new HashSet<>();
        for (String word : words) {
            dictionary.add(word);
        }

        List<String> result = new ArrayList<>();
        for (String word : words) {
            if (isConcatenated(word, dictionary)) {
                result.add(word);
            }
        }
        return result.toArray(new String[0]);
    }

    private boolean isConcatenated(String word, Set<String> dictionary) {
        int n = word.length();
        // Word-break DP: dp[i] = the first i chars split entirely into
        // dictionary words (dp[0] = empty prefix).
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                // Excluding the whole-word split forces >= 2 pieces; only
                // proper substrings are looked up, so the unfiltered set of
                // all words is safe.
                if (j == 0 && i == n) {
                    continue; // the word itself does not count as a part
                }
                if (dp[j] && dictionary.contains(word.substring(j, i))) {
                    // One valid split per position suffices.
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
}
