class Solution {
  public:
    int findCelebrity(vector<vector<int>> &graph) {
        int n = graph.size();
        // Elimination pass: a candidate that knows nobody else.
        int candidate = 0;
        for (int i = 1; i < n; ++i) {
            if (graph[candidate][i] == 1)
                candidate = i;
        }
        // Verification pass.
        for (int i = 0; i < n; ++i) {
            if (i == candidate)
                continue;
            if (graph[candidate][i] == 1)
                return -1; // candidate knows someone
            if (graph[i][candidate] == 0)
                return -1; // someone does not know the candidate
        }
        return candidate;
    }
};
