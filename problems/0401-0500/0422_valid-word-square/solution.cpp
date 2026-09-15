class Solution {
  public:
    bool validWordSquare(vector<string> &words) {
        // A word square mirrors across its diagonal with absence counted:
        // the character at (i, j) demands a same-character mirror at
        // (j, i), so row j must exist at all and reach back to column i.
        int count = (int)words.size();
        for (int i = 0; i < count; ++i) {
            const string &row = words[i];
            for (int j = 0; j < (int)row.size(); ++j) {
                if (j >= count || i >= (int)words[j].size() || words[j][i] != row[j]) {
                    return false;
                }
            }
        }
        return true;
    }
};
