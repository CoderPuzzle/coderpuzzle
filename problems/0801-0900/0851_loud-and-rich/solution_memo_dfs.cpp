class Solution {
  public:
    vector<int> loudAndRich(vector<vector<int>> &richer, vector<int> &quiet) {
        // Each pair [a, b] is an edge from a richer person to a poorer one,
        // so the people definitely at least as rich as x are x plus all its
        // ancestors in the DAG. A memoized DFS settles persons from the
        // known-poorest upward: once every direct richer neighbor of x has
        // settled, answer[x] folds in their answers, each of which already
        // covers that neighbor's whole chain.
        int n = quiet.size();
        vector<vector<int>> richerOf(n);
        for (const vector<int> &pair : richer) {
            richerOf[pair[1]].push_back(pair[0]);
        }
        vector<int> answer(n);
        for (int x = 0; x < n; ++x) {
            answer[x] = x;
        }
        vector<bool> settled(n, false);
        vector<pair<int, int>> stack;
        for (int start = 0; start < n; ++start) {
            if (settled[start]) {
                continue;
            }
            stack.clear();
            stack.push_back({start, 0});
            while (!stack.empty()) {
                int x = stack.back().first;
                int i = stack.back().second;
                if (i < (int)richerOf[x].size()) {
                    ++stack.back().second;
                    int a = richerOf[x][i];
                    if (!settled[a]) {
                        stack.push_back({a, 0});
                    }
                } else {
                    stack.pop_back();
                    for (int a : richerOf[x]) {
                        if (quiet[answer[a]] < quiet[answer[x]]) {
                            answer[x] = answer[a];
                        }
                    }
                    settled[x] = true;
                }
            }
        }
        return answer;
    }
};
