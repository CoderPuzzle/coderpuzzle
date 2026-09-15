class Solution {
  public:
    int maxLengthBetweenEqualCharacters(string s) {
        // Only a character's first and last occurrence can bound the widest
        // gap for that character, so a single pass recording first-seen
        // indices is enough.
        vector<int> first(26, -1);
        int best = -1;
        for (int index = 0; index < (int)s.size(); ++index) {
            int c = s[index] - 'a';
            if (first[c] == -1) {
                first[c] = index;
            } else {
                best = max(best, index - first[c] - 1);
            }
        }
        return best;
    }
};
