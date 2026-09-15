class Solution {
  public:
    vector<bool> canMakePaliQueries(string s, vector<vector<int>> &queries) {
        int n = s.size();
        // prefix[i] = bitmask of parities of letter counts in s[:i]
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] ^ (1 << (s[i] - 'a'));
        }
        vector<bool> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            int left = query[0];
            int right = query[1];
            int k = query[2];
            int mask = prefix[right + 1] ^ prefix[left];
            int odd = __builtin_popcount(mask);
            answer.push_back(odd / 2 <= k);
        }
        return answer;
    }
};
