class Solution {
  public:
    long long gridGame(vector<vector<int>> &grid) {
        long long topRemaining = accumulate(grid[0].begin(), grid[0].end(), 0LL);
        long long bottomPrefix = 0;
        long long answer = LLONG_MAX;
        for (int column = 0; column < (int)grid[0].size(); ++column) {
            topRemaining -= grid[0][column];
            answer = min(answer, max(topRemaining, bottomPrefix));
            bottomPrefix += grid[1][column];
        }
        return answer;
    }
};
