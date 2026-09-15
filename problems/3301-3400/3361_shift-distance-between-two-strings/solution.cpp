class Solution {
  public:
    // Prefix sums over the two cyclic cost rings give every letter
    // pair's cheaper direction; the answer sums the per-index pair
    // costs. One pair costs at most 25 * 10^9 = 2.5*10^10, so pair
    // costs and the grand total are accumulated in long long.
    long long shiftDistance(string s, string t, vector<int> &nextCost, vector<int> &previousCost) {
        vector<long long> pn(27, 0), pp(27, 0);
        for (int k = 0; k < 26; k++) {
            pn[k + 1] = pn[k] + nextCost[k];
            pp[k + 1] = pp[k] + previousCost[k];
        }
        vector<vector<long long>> cost(26, vector<long long>(26, 0));
        for (int a = 0; a < 26; a++) {
            for (int b = 0; b < 26; b++) {
                long long nxt;
                if (a < b) {
                    nxt = pn[b] - pn[a];
                } else if (a > b) {
                    nxt = pn[26] - pn[a] + pn[b];
                } else {
                    nxt = 0;
                }
                long long prv;
                if (b < a) {
                    prv = pp[a + 1] - pp[b + 1];
                } else if (b > a) {
                    prv = pp[26] - pp[b + 1] + pp[a + 1];
                } else {
                    prv = 0;
                }
                cost[a][b] = min(nxt, prv);
            }
        }
        long long total = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            total += cost[s[i] - 'a'][t[i] - 'a'];
        }
        return total;
    }
};
