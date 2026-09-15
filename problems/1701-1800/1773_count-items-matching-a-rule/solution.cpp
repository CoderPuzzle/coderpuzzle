class Solution {
  public:
    int countMatches(vector<vector<string>> &items, string ruleKey, string ruleValue) {
        // The three rule keys are exactly the three columns of every item,
        // so the key resolves once to a column index and the loop below
        // compares one fixed field of each row.
        int index = columnIndex(ruleKey);
        int matches = 0;
        for (const vector<string> &item : items) {
            if (item[index] == ruleValue) {
                matches++;
            }
        }
        return matches;
    }

  private:
    // "type" is column 0, "color" column 1, "name" column 2.
    static int columnIndex(const string &ruleKey) {
        if (ruleKey == "type")
            return 0;
        if (ruleKey == "color")
            return 1;
        return 2;
    }
};
