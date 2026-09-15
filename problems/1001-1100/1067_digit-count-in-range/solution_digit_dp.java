import java.util.*;

class Solution {

    // Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
    public int digitsCount(int d, int low, int high) {
        return (int) (countUpTo(d, high) - countUpTo(d, low - 1));
    }

    private long countUpTo(int d, long n) {
        if (n <= 0) {
            return 0;
        }
        String s = Long.toString(n);
        int length = s.length();
        int[] digits = new int[length];
        for (int i = 0; i < length; i++) {
            digits[i] = s.charAt(i) - '0';
        }
        // Free (non-tight) suffixes recur, so they are memoized per
        // (position, started): {completions, occurrences} pairs.
        long[][][] memo = new long[length][2][];
        // The all-zero completion is the number 0 and carries no
        // appearances, so the walk tallies exactly the integers 1..n.
        return solve(digits, d, 0, true, false, memo)[1];
    }

    // Each state reports how many suffix completions it admits and how many
    // appearances of d those completions contain.
    private long[] solve(int[] digits, int d, int pos, boolean tight, boolean started, long[][][] memo) {
        if (pos == digits.length) {
            return new long[] { 1, 0 };
        }
        int startedIdx = started ? 1 : 0;
        if (!tight && memo[pos][startedIdx] != null) {
            return memo[pos][startedIdx];
        }
        int maxDigit = tight ? digits[pos] : 9;
        long completions = 0;
        long occurrences = 0;
        for (int digit = 0; digit <= maxDigit; digit++) {
            long[] inner = solve(digits, d, pos + 1, tight && digit == maxDigit, started || digit > 0, memo);
            completions += inner[0];
            occurrences += inner[1];
            // Placing d here shows d in every completion below, unless it is
            // a leading zero -- those are never written.
            if (digit == d && (started || digit > 0)) {
                occurrences += inner[0];
            }
        }
        long[] state = { completions, occurrences };
        if (!tight) {
            memo[pos][startedIdx] = state;
        }
        return state;
    }
}
