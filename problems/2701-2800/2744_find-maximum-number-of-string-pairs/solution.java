import java.util.HashSet;
import java.util.Set;

class Solution {

    public int maximumNumberOfStringPairs(String[] words) {
        // A word pairs only with its reversal among earlier words: look up
        // before inserting, so a word can never pair with itself. Distinct
        // strings make each candidate partner unique, so counting every hit
        // is optimal — palindromes can never find an earlier copy at all.
        Set<String> seen = new HashSet<>();
        int pairs = 0;
        for (int j = 0; j < words.length; ++j) {
            String reversed = new StringBuilder(words[j]).reverse().toString();
            if (seen.contains(reversed)) {
                ++pairs;
            }
            seen.add(words[j]);
        }
        return pairs;
    }
}
