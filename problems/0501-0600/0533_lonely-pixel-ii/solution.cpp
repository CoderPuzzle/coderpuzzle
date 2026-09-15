class Solution {
  public:
    int findBlackPixel(vector<vector<string>> &picture, int target) {
        // Rule 2 asks every row carrying a black pixel in column c to be an
        // exact copy of row r, so rows only interact through their content:
        // identical rows form a class keyed by the joined row string.
        int m = picture.size();
        int n = picture[0].size();
        unordered_map<string, int> classOfKey;
        vector<int> classRowCount;
        vector<int> rowClass(m, 0);
        vector<int> colCount(n, 0);
        for (int i = 0; i < m; i++) {
            string key;
            for (const string &cell : picture[i])
                key += cell;
            if (classOfKey.find(key) == classOfKey.end()) {
                classOfKey[key] = classRowCount.size();
                classRowCount.push_back(countBlacks(picture[i]));
            }
            rowClass[i] = classOfKey[key];
            for (int j = 0; j < n; j++) {
                if (picture[i][j] == "B")
                    colCount[j]++;
            }
        }
        // blacks[j][k]: how many black cells column j carries from class k.
        int classes = classRowCount.size();
        vector<vector<int>> blacks(n, vector<int>(classes, 0));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (picture[i][j] == "B")
                    blacks[j][rowClass[i]]++;
            }
        }
        // A column pays out exactly target pixels when its target blacks all
        // come from one class (rule 2) whose rows hold target blacks (rule 1).
        int total = 0;
        for (int j = 0; j < n; j++) {
            if (colCount[j] != target)
                continue;
            for (int k = 0; k < classes; k++) {
                if (blacks[j][k] == target && classRowCount[k] == target)
                    total += target;
            }
        }
        return total;
    }

  private:
    int countBlacks(vector<string> &row) {
        int blacks = 0;
        for (const string &cell : row) {
            if (cell == "B")
                blacks++;
        }
        return blacks;
    }
};
