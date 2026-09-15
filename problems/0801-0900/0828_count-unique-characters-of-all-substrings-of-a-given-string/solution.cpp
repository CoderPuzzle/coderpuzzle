class Solution {
  public:
    int uniqueLetterString(string s) {
        // Reorganize the sum per occurrence: a letter adds 1 exactly
        // for substrings in which it appears precisely once. Bucket
        // the indices of each letter.
        vector<vector<int>> positions(26);
        for (int i = 0; i < (int)s.size(); i++) {
            positions[s[i] - 'A'].push_back(i);
        }
        int n = s.size();
        long long total = 0;
        for (auto &list : positions) {
            if (list.empty()) {
                continue;
            }
            // Sentinels -1 and n give the first and last occurrences
            // the same window arithmetic.
            vector<int> pos;
            pos.reserve(list.size() + 2);
            pos.push_back(-1);
            for (int p : list) {
                pos.push_back(p);
            }
            pos.push_back(n);
            for (int k = 1; k < (int)pos.size() - 1; k++) {
                // i-p left endpoints after the previous equal letter,
                // q-i right endpoints before the next: each
                // (substring, unique char) pair counted exactly once.
                total += (long long)(pos[k] - pos[k - 1]) * (pos[k + 1] - pos[k]);
            }
        }
        return (int)total;
    }
};
