#include <algorithm>
#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    int minFlips(string s) {
        const int INF = 1e9;
        vector<vector<int>> dp(3, vector<int>(3, INF));
        dp[0][0] = 0;
        string p1 = "011";
        string p2 = "110";
        for (char c : s) {
            vector<vector<int>> next(3, vector<int>(3, INF));
            for (int a = 0; a < 3; ++a) {
                for (int b = 0; b < 3; ++b) {
                    if (dp[a][b] == INF)
                        continue;
                    for (char put : string("01")) {
                        int total = dp[a][b] + (put != c ? 1 : 0);
                        int na = put == p1[a] ? a + 1 : a;
                        int nb = put == p2[b] ? b + 1 : b;
                        if (na == 3 || nb == 3)
                            continue;
                        next[na][nb] = min(next[na][nb], total);
                    }
                }
            }
            dp.swap(next);
        }
        int answer = INF;
        for (int a = 0; a < 3; ++a)
            for (int b = 0; b < 3; ++b)
                answer = min(answer, dp[a][b]);
        return answer;
    }
};
