class Solution {
  public:
    string restoreString(string s, vector<int> &indices) {
        // indices[i] names s[i]'s destination outright, so just write each
        // character straight into its final slot.
        string result(s.size(), ' ');
        for (int i = 0; i < (int)s.size(); ++i) {
            result[indices[i]] = s[i];
        }
        return result;
    }
};
