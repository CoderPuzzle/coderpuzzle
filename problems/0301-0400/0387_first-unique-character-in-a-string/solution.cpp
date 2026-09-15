class Solution {
  public:
    int firstUniqChar(string s) {
        // A character is non-repeating exactly when it occurs once in the
        // whole string — a global fact no prefix can settle — so the first
        // pass tallies occurrences, one slot per letter of the alphabet.
        array<int, 26> counts{};
        for (char ch : s) {
            counts[ch - 'a']++;
        }
        // The second pass scans in index order for the first slot reading
        // exactly 1 — scanning left to right is what answers "first" — and
        // reaching the end without a hit means -1.
        for (int i = 0; i < (int)s.size(); ++i) {
            if (counts[s[i] - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
};
