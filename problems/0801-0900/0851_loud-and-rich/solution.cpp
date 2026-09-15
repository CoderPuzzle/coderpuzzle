class Solution {
  public:
    vector<int> loudAndRich(vector<vector<int>> &richer, vector<int> &quiet) {
        // Each pair [a, b] is an edge from a richer person to a poorer one,
        // so the people definitely at least as rich as x are x plus all its
        // ancestors in the DAG. A Kahn sweep settles persons from the
        // known-richest downward: once every richer neighbor of b has
        // relaxed its answer into b, answer[b] holds the least quiet person
        // among them all.
        int n = quiet.size();
        vector<vector<int>> poorer(n);
        vector<int> pending(n, 0);
        for (const vector<int> &pair : richer) {
            poorer[pair[0]].push_back(pair[1]);
            ++pending[pair[1]];
        }
        vector<int> answer(n);
        for (int x = 0; x < n; ++x) {
            answer[x] = x;
        }
        vector<int> settled;
        settled.reserve(n);
        for (int x = 0; x < n; ++x) {
            if (pending[x] == 0) {
                settled.push_back(x);
            }
        }
        for (int i = 0; i < (int)settled.size(); ++i) {
            int x = settled[i];
            for (int b : poorer[x]) {
                if (quiet[answer[x]] < quiet[answer[b]]) {
                    answer[b] = answer[x];
                }
                if (--pending[b] == 0) {
                    settled.push_back(b);
                }
            }
        }
        return answer;
    }
};
