class Solution {
  public:
    int minFlips(string s) {
        int n = s.size();
        string t = s + s;
        // pre[i] = mismatches of t[0:i] against the absolute pattern 0,1,0,1,...
        vector<int> pre(t.size() + 1, 0);
        for (int i = 0; i < (int)t.size(); ++i) {
            char want = (i & 1) ? '1' : '0';
            pre[i + 1] = pre[i] + (t[i] != want ? 1 : 0);
        }
        int best = n;
        for (int k = 0; k < n; ++k) {
            int absMismatch = pre[k + n] - pre[k];
            int costA = (k & 1) ? n - absMismatch : absMismatch;
            best = min(best, min(costA, n - costA));
        }
        return best;
    }
};
