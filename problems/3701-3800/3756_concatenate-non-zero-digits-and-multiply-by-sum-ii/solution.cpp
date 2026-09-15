#include <string>
#include <vector>

class Solution {
  public:
    vector<int> sumAndMultiply(string s, vector<vector<int>> &queries) {
        // Prefix arrays over the NON-ZERO digits: prefVal keeps the value
        // mod M of concatenating them, prefSum their digit sum, prefCnt
        // their count. The compressed substring s[l..r] is the slice of the
        // non-zero sequence between indexes cnt[l] and cnt[r+1]; its value
        // is recoverable from the two prefix values with one pow10 shift,
        // and its digit sum is a plain prefix difference (zeros add 0 to
        // both). All products stay below (10^9+7)^2 ~ 1e18, inside long.
        const int MOD = 1000000007;
        int n = (int)s.size();
        vector<long long> prefVal(n + 1, 0), prefSum(n + 1, 0), pow10(n + 1, 1);
        vector<int> prefCnt(n + 1, 0);
        for (int i = 0; i < n; i++) {
            int d = s[i] - '0';
            prefVal[i + 1] = prefVal[i];
            prefSum[i + 1] = prefSum[i] + d;
            prefCnt[i + 1] = prefCnt[i];
            pow10[i + 1] = pow10[i] * 10 % MOD;
            if (s[i] != '0') {
                prefVal[i + 1] = (prefVal[i] * 10 + d) % MOD;
                prefCnt[i + 1]++;
            }
        }
        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int l = query[0], r = query[1];
            int k = prefCnt[r + 1] - prefCnt[l];
            // x = the concatenation of the k non-zero digits in s[l..r];
            // prefVal[r+1] = prefVal[l] * 10^k + x, so solve for x.
            long long x = (prefVal[r + 1] - prefVal[l] * pow10[k]) % MOD;
            if (x < 0) {
                x += MOD;
            }
            long long digitSum = prefSum[r + 1] - prefSum[l];
            answer.push_back((int)((x * digitSum) % MOD));
        }
        return answer;
    }
};
