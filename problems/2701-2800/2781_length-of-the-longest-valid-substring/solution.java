import java.util.HashSet;
import java.util.Set;

class Solution {

    public int longestValidSubstring(String word, String[] forbidden) {
        Set<String> banned = new HashSet<>();
        for (String s : forbidden) {
            banned.add(s);
        }
        int maxLen = 0;
        for (String s : banned) {
            maxLen = Math.max(maxLen, s.length());
        }
        int n = word.length();
        int left = 0;
        int ans = 0;
        // Validity is hereditary (shrinking a valid window stays valid), so a
        // two-pointer sweep finds the longest valid substring.
        for (int right = 0; right < n; right++) {
            // Only suffixes ending at right can be forbidden, each at most
            // maxLen (<= 10) long; nothing before left - 1 can matter since
            // earlier occurrences were already excluded.
            int start = Math.max(right - maxLen, left - 1);
            // Test suffixes shortest-first: the shortest match has the
            // latest start, so jumping left past it yields the largest
            // window that excludes every forbidden occurrence.
            for (int j = right; j > start; j--) {
                if (banned.contains(word.substring(j, right + 1))) {
                    left = j + 1;
                    break;
                }
            }
            ans = Math.max(ans, right - left + 1);
        }
        return ans;
    }
}
