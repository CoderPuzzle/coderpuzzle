class Solution {
  public:
    vector<bool> pathExistenceQueries(int n, vector<int> &nums, int maxDiff, vector<vector<int>> &queries) {
        // nums is sorted, so any edge i-j (i < j) forces every consecutive
        // pair between them to be an edge too — components are contiguous
        // segments, cut wherever a gap exceeds maxDiff.
        vector<int> comp(n);
        for (int i = 1; i < n; i++)
            comp[i] = comp[i - 1] + (nums[i] - nums[i - 1] > maxDiff ? 1 : 0);
        vector<bool> answer;
        answer.reserve(queries.size());
        for (auto &q : queries)
            answer.push_back(comp[q[0]] == comp[q[1]]);
        return answer;
    }
};
