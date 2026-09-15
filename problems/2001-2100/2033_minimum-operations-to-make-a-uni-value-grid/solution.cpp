class Solution {
  public:
    int minOperations(vector<vector<int>> &grid, int x) {
        vector<int> values;
        values.reserve(grid.size() * grid[0].size());
        int remainder = grid[0][0] % x;
        for (const vector<int> &row : grid) {
            for (int value : row) {
                if (value % x != remainder)
                    return -1;
                values.push_back(value);
            }
        }

        sort(values.begin(), values.end());
        int median = values[values.size() / 2];
        long long operations = 0;
        for (int value : values)
            operations += llabs((long long)value - median) / x;
        return (int)operations;
    }
};
