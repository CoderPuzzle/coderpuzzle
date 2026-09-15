import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean equalFrequency(String word) {
        // Count all 26 letters, then try removing one occurrence of each
        // present letter and test whether the surviving frequencies
        // collapse to a single value. 26 candidates x O(26) check.
        int[] freq = new int[26];
        for (int p = 0; p < word.length(); ++p) {
            ++freq[word.charAt(p) - 'a'];
        }
        for (int c = 0; c < 26; ++c) {
            if (freq[c] == 0) {
                continue;
            }
            --freq[c];
            Set<Integer> remaining = new HashSet<>();
            for (int f : freq) {
                if (f > 0) {
                    remaining.add(f);
                }
            }
            if (remaining.size() <= 1) {
                return true;
            }
            ++freq[c];
        }
        return false;
    }
}
