class Solution {
  public:
    int minLengthAfterRemovals(string s) {
        // Every operation deletes one 'a' together with one 'b', so the
        // difference between the two counts never changes; while both
        // letters remain some adjacent pair differs, and deleting such
        // pairs one after another boils the string down to exactly that
        // difference.
        int countA = 0;
        for (char ch : s) {
            if (ch == 'a') {
                countA++;
            }
        }
        int countB = (int)s.size() - countA;
        return abs(countA - countB);
    }
};
