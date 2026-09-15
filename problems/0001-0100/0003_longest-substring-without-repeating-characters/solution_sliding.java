class Solution {

    public int lengthOfLongestSubstring(String s) {
        // inWindow[c] marks the characters currently inside the window
        // s[start..i], which never contains a duplicate.
        boolean[] inWindow = new boolean[128];
        int start = 0,
            best = 0;
        for (int i = 0; i < s.length(); i++) {
            int c = s.charAt(i);
            // Evict characters from the left until c can enter without
            // duplicating: the window shrinks one step at a time.
            while (inWindow[c]) {
                inWindow[s.charAt(start)] = false;
                start++;
            }
            inWindow[c] = true;
            // The window is duplicate-free again: record its length.
            best = Math.max(best, i - start + 1);
        }
        return best;
    }
}
