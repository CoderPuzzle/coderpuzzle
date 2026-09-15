class Solution {
  public:
    bool isAcronym(vector<string> &words, string s) {
        // Collect the first character of every word, assemble them into one
        // string in order, and compare the assembled acronym with s. The
        // equality test rejects unequal lengths before scanning characters.
        string acronym;
        for (const string &word : words) {
            acronym.push_back(word[0]);
        }
        return acronym == s;
    }
};
