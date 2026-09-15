import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean isScramble(String s1, String s2) {
        // Memoized recursion over string pairs. Two guards run before any
        // split work: identical strings are trivially scrambles, and a pair
        // whose letter counts differ can never be one, since swapping blocks
        // of a string only rearranges its letters.
        Map<String, Boolean> memo = new HashMap<>();
        return solve(s1, s2, memo);
    }

    // A scramble never adds or removes a letter, so a count mismatch rules
    // the pair out before any split is tried.
    private boolean sameLetters(String a, String b) {
        int[] counts = new int[26];
        for (int i = 0; i < a.length(); ++i) {
            ++counts[a.charAt(i) - 'a'];
        }
        for (int i = 0; i < b.length(); ++i) {
            --counts[b.charAt(i) - 'a'];
        }
        for (int count : counts) {
            if (count != 0) {
                return false;
            }
        }
        return true;
    }

    // The pair (a + "|" + b) keys the memo; '|' cannot occur in the inputs.
    private boolean solve(String a, String b, Map<String, Boolean> memo) {
        if (a.equals(b)) {
            return true;
        }
        if (!sameLetters(a, b)) {
            return false;
        }
        String key = a + "|" + b;
        if (memo.containsKey(key)) {
            return memo.get(key);
        }
        int n = a.length();
        for (int i = 1; i < n; ++i) {
            // Keep the halves in order: the split of b sits at the same
            // index as the split of a.
            if (solve(a.substring(0, i), b.substring(0, i), memo) && solve(a.substring(i), b.substring(i), memo)) {
                memo.put(key, true);
                return true;
            }
            // Swap the halves: the head of a pairs with the tail of b.
            if (
                solve(a.substring(0, i), b.substring(n - i), memo) && solve(a.substring(i), b.substring(0, n - i), memo)
            ) {
                memo.put(key, true);
                return true;
            }
        }
        memo.put(key, false);
        return false;
    }
}
