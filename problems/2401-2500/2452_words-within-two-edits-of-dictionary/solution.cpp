class Solution {
  public:
    vector<string> twoEditWords(vector<string> &queries, vector<string> &dictionary) {
        // A query survives iff some dictionary word differs in at most two
        // positions; the strings are equal-length, so a position count is all
        // it takes.
        vector<string> result;
        for (const string &q : queries) {
            for (const string &d : dictionary) {
                if (edits(q, d) <= 2) {
                    result.push_back(q);
                    break;
                }
            }
        }
        return result;
    }

  private:
    static int edits(const string &a, const string &b) {
        int count = 0;
        for (size_t i = 0; i < a.size(); ++i)
            if (a[i] != b[i])
                ++count;
        return count;
    }
};
