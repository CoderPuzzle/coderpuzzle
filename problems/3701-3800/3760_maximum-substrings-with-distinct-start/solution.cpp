class Solution {
  public:
    int maxDistinctStarts(string s) {
        // A piece is decided by its start: scanning left to right, the
        // current letter may open a new piece exactly when no earlier piece
        // already started with it. Accepting it costs only that one letter's
        // availability, and each letter starts at most one piece anyway, so
        // the greedy never blocks a better split.
        bool seen[26] = {};
        for (char ch : s) {
            seen[ch - 'a'] = true;
        }
        int count = 0;
        for (bool used : seen) {
            count += used;
        }
        return count;
    }
};
