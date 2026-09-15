class Solution {
  public:
    int findContentChildren(vector<int> &g, vector<int> &s) {
        // Both sorted ascending, the least greedy unfed child faces the
        // smallest unassigned cookie: the cheapest pairing worth trying.
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());
        int child = 0;
        for (int cookie : s) {
            // A cookie too small for the least greedy remaining child is too
            // small for everyone remaining — skip it. Otherwise feed it.
            if (child < (int)g.size() && cookie >= g[child]) {
                ++child;
            }
        }
        return child;
    }
};
