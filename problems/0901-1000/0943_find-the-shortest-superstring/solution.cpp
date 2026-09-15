class Solution {
  public:
    string shortestSuperstring(vector<string> &words) {
        int k = (int)words.size();
        vector<vector<int>> overlap(k, vector<int>(k, 0));
        for (int i = 0; i < k; i++) {
            for (int j = 0; j < k; j++) {
                if (i == j)
                    continue;
                int best = 0;
                int limit = (int)min(words[i].size(), words[j].size());
                for (int size = 1; size <= limit; size++) {
                    if (words[i].substr(words[i].size() - size, size) == words[j].substr(0, size)) {
                        best = size;
                    }
                }
                overlap[i][j] = best;
            }
        }

        int total = 1 << k;
        vector<vector<int>> dpLen(total, vector<int>(k, -1));
        vector<vector<string>> dpStr(total, vector<string>(k));
        vector<vector<vector<int>>> dpSeq(total, vector<vector<int>>(k));
        vector<vector<char>> has(total, vector<char>(k, 0));
        for (int i = 0; i < k; i++) {
            dpLen[1 << i][i] = (int)words[i].size();
            dpStr[1 << i][i] = words[i];
            dpSeq[1 << i][i] = {i};
            has[1 << i][i] = 1;
        }

        for (int mask = 0; mask < total; mask++) {
            for (int j = 0; j < k; j++) {
                if (!has[mask][j])
                    continue;
                int curLen = dpLen[mask][j];
                const string &curStr = dpStr[mask][j];
                const vector<int> &curSeq = dpSeq[mask][j];
                for (int nxt = 0; nxt < k; nxt++) {
                    if ((mask >> nxt) & 1)
                        continue;
                    int candLen = curLen + (int)words[nxt].size() - overlap[j][nxt];
                    string candStr = curStr + words[nxt].substr(overlap[j][nxt]);
                    vector<int> candSeq = curSeq;
                    candSeq.push_back(nxt);
                    int newMask = mask | (1 << nxt);
                    if (!has[newMask][nxt] || candLen < dpLen[newMask][nxt] ||
                        (candLen == dpLen[newMask][nxt] && candSeq < dpSeq[newMask][nxt])) {
                        dpLen[newMask][nxt] = candLen;
                        dpStr[newMask][nxt] = candStr;
                        dpSeq[newMask][nxt] = candSeq;
                        has[newMask][nxt] = 1;
                    }
                }
            }
        }

        int full = total - 1;
        int bestJ = -1;
        for (int j = 0; j < k; j++) {
            if (!has[full][j])
                continue;
            if (bestJ == -1 || dpLen[full][j] < dpLen[full][bestJ] ||
                (dpLen[full][j] == dpLen[full][bestJ] && dpSeq[full][j] < dpSeq[full][bestJ])) {
                bestJ = j;
            }
        }
        return dpStr[full][bestJ];
    }
};
