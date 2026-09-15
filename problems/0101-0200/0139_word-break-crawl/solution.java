import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean wordBreak(String s, String[] wordDict) {
        // Bottom-up DP over prefix reachability: reachable[i] says the first i
        // characters of s split into dictionary words. The empty prefix is
        // reachable, and the answer is reachable[s.length()].
        Set<String> words = new HashSet<>(Arrays.asList(wordDict));
        int[] lengths = words.stream().mapToInt(String::length).distinct().sorted().toArray();
        boolean[] reachable = new boolean[s.length() + 1];
        reachable[0] = true;
        for (int i = 1; i <= s.length(); ++i) {
            for (int length : lengths) {
                if (length > i) break;
                // Position i ends a word exactly when the prefix before it is
                // reachable and the slice ending here is a dictionary word.
                if (reachable[i - length] && words.contains(s.substring(i - length, i))) {
                    reachable[i] = true;
                    break;
                }
            }
        }
        return reachable[s.length()];
    }
}
