class Solution {
  public:
    int countPrefixes(vector<string> &words, string s) {
        int count = 0;
        for (const string &word : words) {
            if (s.compare(0, word.size(), word) == 0) {
                count++;
            }
        }
        return count;
    }
};
