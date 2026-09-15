class Solution {
  public:
    vector<long long> countKConstraintSubstrings(string s, int k, vector<vector<int>> &queries) {
        int n = s.size();
        vector<int> bounds(n);
        int left = 0;
        int zeros = 0;
        int ones = 0;
        for (int right = 0; right < n; right++) {
            if (s[right] == '0') {
                zeros++;
            } else {
                ones++;
            }
            while (zeros > k && ones > k) {
                if (s[left] == '0') {
                    zeros--;
                } else {
                    ones--;
                }
                left++;
            }
            bounds[right] = left;
        }
        vector<long long> pre(n + 1, 0);
        for (int j = 0; j < n; j++) {
            pre[j + 1] = pre[j] + (j + 1 - bounds[j]);
        }
        vector<int> nxt(n, n);
        int ptr = n;
        for (int l = n - 1; l >= 0; l--) {
            while (ptr > 0 && bounds[ptr - 1] >= l) {
                ptr--;
            }
            nxt[l] = ptr;
        }
        vector<long long> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int l = query[0];
            int r = query[1];
            int j = nxt[l];
            if (j > r) {
                long long m = r - l + 1;
                answer.push_back(m * (m + 1) / 2);
            } else {
                long long d = j - l;
                answer.push_back(pre[r + 1] - pre[j] + d * (d + 1) / 2);
            }
        }
        return answer;
    }
};
