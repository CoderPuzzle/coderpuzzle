class Solution {

    public int maxDistinctStarts(String s) {
        // A piece is decided by its start: scanning left to right, the
        // current letter may open a new piece exactly when no earlier piece
        // already started with it. Accepting it costs only that one letter's
        // availability, and each letter starts at most one piece anyway, so
        // the greedy never blocks a better split.
        boolean[] seen = new boolean[26];
        for (int i = 0; i < s.length(); i++) {
            seen[s.charAt(i) - 'a'] = true;
        }
        int count = 0;
        for (boolean used : seen) {
            if (used) {
                count++;
            }
        }
        return count;
    }
}
