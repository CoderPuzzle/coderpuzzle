class Solution {
  public:
    int lengthOfLastWord(string s) {
        // Walk in from the right: trailing spaces belong to no word, so skip
        // them, then count letters until a space or the start of the string.
        int i = (int)s.size() - 1;
        while (i >= 0 && s[i] == ' ') {
            --i;
        }
        int end = i;
        while (i >= 0 && s[i] != ' ') {
            --i;
        }
        return end - i;
    }
};
