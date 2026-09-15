import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public String[] getWordsInLongestSubsequence(String[] words, int[] groups) {
        // dp[i] is the length of the longest valid subsequence ending at
        // index i; prev[i] remembers the predecessor that achieved it.
        // Scanning predecessors from i - 1 downward and updating only on a
        // strict improvement keeps the latest compatible index attaining the
        // maximum, which pins one deterministic answer out of the many the
        // statement permits.
        int n = words.length;
        int[] dp = new int[n];
        int[] prev = new int[n];
        Arrays.fill(dp, 1);
        Arrays.fill(prev, -1);
        for (int i = 0; i < n; ++i) {
            for (int j = i - 1; j >= 0; --j) {
                if (groups[j] == groups[i] || words[j].length() != words[i].length()) {
                    continue;
                }
                if (dp[j] + 1 <= dp[i]) {
                    continue;
                }
                // Hamming distance exactly 1: walk the equal-length strings
                // and stop at a second mismatch.
                int diffs = 0;
                for (int p = 0; p < words[j].length() && diffs < 2; ++p) {
                    if (words[j].charAt(p) != words[i].charAt(p)) ++diffs;
                }
                if (diffs == 1) {
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                }
            }
        }
        int best = n - 1;
        for (int i = n - 2; i >= 0; --i) {
            if (dp[i] > dp[best]) best = i;
        }
        List<String> chain = new ArrayList<>();
        for (int i = best; i != -1; i = prev[i]) chain.add(words[i]);
        String[] answer = new String[chain.size()];
        for (int p = 0; p < chain.size(); ++p) answer[p] = chain.get(chain.size() - 1 - p);
        return answer;
    }
}
