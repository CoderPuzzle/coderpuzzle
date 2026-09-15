import java.util.HashSet;
import java.util.Set;

class Solution {

    public int countPalindromicSubsequence(String s) {
        int count = 0;
        for (char ch = 'a'; ch <= 'z'; ch++) {
            // Palindrome ch-y-ch exists iff some y sits strictly between the
            // first and last occurrence of ch: anchoring the outers at the
            // outermost occurrences is the most permissive choice.
            int first = s.indexOf(ch);
            int last = s.lastIndexOf(ch);
            if (first != -1 && last - first >= 2) {
                // Distinct chars only (a set, not positions) so each
                // palindrome is counted once despite repeated middle letters.
                Set<Character> seen = new HashSet<>();
                for (int i = first + 1; i < last; i++) seen.add(s.charAt(i));
                count += seen.size();
            }
        }
        return count;
    }
}
