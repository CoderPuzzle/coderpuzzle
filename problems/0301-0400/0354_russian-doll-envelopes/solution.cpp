class Solution {
  public:
    int maxEnvelopes(vector<vector<int>> &envelopes) {
        // Width ascending, height descending on ties: a chain needs strictly
        // increasing widths, so at most one envelope per width fits, and the
        // descending tie-break keeps equal widths from chaining among
        // themselves — the task reduces to LIS on heights.
        sort(envelopes.begin(), envelopes.end(), [](const vector<int> &a, const vector<int> &b) {
            if (a[0] != b[0])
                return a[0] < b[0];
            return a[1] > b[1];
        });
        // Patience sorting: tails[i] = min height ending a chain of length i+1.
        vector<int> tails;
        for (auto &e : envelopes) {
            int x = e[1];
            // lower_bound enforces STRICT increase (rejects equal heights);
            // extend the longest chain or replace the first >= tail — safe,
            // it only helps future extensions.
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end())
                tails.push_back(x);
            else
                *it = x;
        }
        return (int)tails.size();
    }
};
