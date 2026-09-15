class Solution {
  public:
    vector<string> invalidTransactions(vector<string> &transactions) {
        int n = transactions.size();
        vector<array<string, 4>> parsed(n);
        for (int i = 0; i < n; i++) {
            array<string, 4> f;
            int start = 0, slot = 0;
            for (int k = 0; k <= (int)transactions[i].size(); k++) {
                if (k == (int)transactions[i].size() || transactions[i][k] == ',') {
                    f[slot++] = transactions[i].substr(start, k - start);
                    start = k + 1;
                }
            }
            parsed[i] = f;
        }
        vector<bool> flags(n, false);
        // An amount over the limit convicts on its own; otherwise the
        // transaction waits for a same-name partner in another city within
        // 60 minutes — which may appear anywhere in the array.
        for (int i = 0; i < n; i++) {
            if (stoi(parsed[i][2]) > 1000) {
                flags[i] = true;
                continue;
            }
            for (int j = 0; j < n; j++) {
                if (i == j || parsed[j][0] != parsed[i][0] || parsed[j][3] == parsed[i][3]) {
                    continue;
                }
                if (abs(stoi(parsed[i][1]) - stoi(parsed[j][1])) <= 60) {
                    flags[i] = true;
                    break;
                }
            }
        }
        vector<string> invalid;
        for (int i = 0; i < n; i++) {
            if (flags[i]) {
                invalid.push_back(transactions[i]);
            }
        }
        return invalid;
    }
};
