class Solution {
  public:
    int longestPalindrome(vector<string> &words) {
        int waiting[26][26] = {};
        int length = 0;
        for (const string &word : words) {
            int first = word[0] - 'a';
            int second = word[1] - 'a';
            if (waiting[second][first] > 0) {
                --waiting[second][first];
                length += 4;
            } else {
                ++waiting[first][second];
            }
        }
        for (int letter = 0; letter < 26; ++letter) {
            if (waiting[letter][letter] > 0) {
                return length + 2;
            }
        }
        return length;
    }
};
