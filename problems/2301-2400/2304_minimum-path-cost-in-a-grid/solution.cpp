class Solution {
  public:
    int minPathCost(vector<vector<int>> &grid, vector<vector<int>> &moveCost) {
        int rows = static_cast<int>(grid.size());
        int columns = static_cast<int>(grid[0].size());
        vector<int> costs(grid[0].begin(), grid[0].end());
        for (int row = 1; row < rows; row++) {
            const vector<int> &previous = grid[row - 1];
            vector<int> next_costs;
            for (int column = 0; column < columns; column++) {
                int best = costs[0] + moveCost[previous[0]][column];
                for (int source = 1; source < columns; source++) {
                    int candidate = costs[source] + moveCost[previous[source]][column];
                    best = min(best, candidate);
                }
                next_costs.push_back(best + grid[row][column]);
            }
            costs = next_costs;
        }
        return *min_element(costs.begin(), costs.end());
    }
};
