class Solution {

    public int firstUniqChar(String s) {
        // A character is non-repeating exactly when it occurs once in the
        // whole string — a global fact no prefix can settle — so the first
        // pass tallies occurrences, one slot per letter of the alphabet.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i) - 'a']++;
        }
        // The second pass scans in index order for the first slot reading
        // exactly 1 — scanning left to right is what answers "first" — and
        // reaching the end without a hit means -1.
        for (int i = 0; i < s.length(); ++i) {
            if (counts[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
}
