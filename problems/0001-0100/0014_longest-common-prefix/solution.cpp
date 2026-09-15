class Solution {
  public:
    string longestCommonPrefix(vector<string> &strs) {
        // The prefix cannot outlive the shortest string, so scanning column
        // by column stops exactly at the first position any string disagrees
        // on or ends.
        const string &first = strs[0];
        for (size_t column = 0; column < first.size(); ++column) {
            // A shorter string ending here is as final as a mismatch:
            // nothing can extend the prefix past its last character.
            for (size_t i = 1; i < strs.size(); ++i) {
                const string &s = strs[i];
                if (column == s.size() || s[column] != first[column]) {
                    return first.substr(0, column);
                }
            }
        }
        // Every column of the first string survived every other string.
        return first;
    }
};
