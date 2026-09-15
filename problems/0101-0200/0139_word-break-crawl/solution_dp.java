import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean wordBreak(String s, String[] wordDict) {
        Set<String> words = new HashSet<>();
        for (String word : wordDict) {
            words.add(word);
        }
        int n = s.length();
        // reachable[i]: the prefix s[0..i) can be segmented; the empty prefix
        // is trivially segmentable.
        boolean[] reachable = new boolean[n + 1];
        reachable[0] = true;
        for (int i = 1; i <= n; i++) {
            // Any segmentation of s[0..i) ends with a last word s[j..i).
            for (int j = 0; j < i; j++) {
                if (reachable[j] && words.contains(s.substring(j, i))) {
                    reachable[i] = true;
                    // Only feasibility matters, so stop at the first split.
                    break;
                }
            }
        }
        return reachable[n];
    }
}
