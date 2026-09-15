class Solution {

    public int lengthOfLongestSubstring(String s) {
        // last[c] holds the most recent index of character c; -1 means never
        // seen, which folds the membership check into the guard below.
        int[] last = new int[128];
        java.util.Arrays.fill(last, -1);
        int start = 0,
            best = 0;
        for (int i = 0; i < s.length(); i++) {
            int c = s.charAt(i);
            // The >= start guard ignores occurrences left of the window;
            // without it start could be dragged backwards.
            if (last[c] >= start) {
                // The window can no longer include that older occurrence, so
                // start leaps over the conflict instead of shrinking by one.
                start = last[c] + 1;
            }
            last[c] = i;
            // Window s[start..i] is duplicate-free again: record its length.
            best = Math.max(best, i - start + 1);
        }
        return best;
    }
}
