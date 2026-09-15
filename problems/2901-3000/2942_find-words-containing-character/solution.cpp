class Solution {
  public:
    // A word qualifies exactly when x occurs in it; string::find answers
    // that in one call (npos means absent), so a single pass over words
    // collects the matching indices in order.
    vector<int> findWordsContaining(vector<string> &words, string x) {
        vector<int> result;
        for (int i = 0; i < (int)words.size(); ++i) {
            if (words[i].find(x) != string::npos)
                result.push_back(i);
        }
        return result;
    }
};
