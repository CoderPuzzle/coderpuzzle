import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] getLongestSubsequence(String[] words, int[] groups) {
        // Taking the first element of every maximal run of equal group
        // values pins one deterministic answer out of the many the statement
        // permits.
        List<String> result = new ArrayList<>();
        result.add(words[0]);
        for (int i = 1; i < groups.length; ++i) {
            if (groups[i] != groups[i - 1]) result.add(words[i]);
        }
        return result.toArray(new String[0]);
    }
}
