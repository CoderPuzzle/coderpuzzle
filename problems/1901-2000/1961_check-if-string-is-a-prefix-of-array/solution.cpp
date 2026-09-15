class Solution {
  public:
    bool isPrefixString(string s, vector<string> &words) {
        // Match each word in order against the front of s: a prefix string is
        // exactly the concatenation of some first-k words, so once s is fully
        // consumed by exact word matches it must be one.
        int i = 0;
        for (string &word : words) {
            if (s.compare(i, word.size(), word) != 0)
                return false;
            i += word.size();
            if (i == (int)s.size())
                return true;
        }
        return false;
    }
};
