class Solution {
  public:
    long long sumRemoteness(vector<vector<int>> &grid) {
        // One flood fill per unvisited non-blocked cell totals the size and
        // value of its component; a cell reaches exactly its own component,
        // so its remoteness is every other component's value, and summing
        // that over all cells collapses to size * (total - component_sum).
        int rows = static_cast<int>(grid.size());
        int columns = static_cast<int>(grid[0].size());
        vector<vector<bool>> visited(rows, vector<bool>(columns, false));
        long long total = 0;
        vector<pair<long long, long long>> components;
        for (int start_row = 0; start_row < rows; ++start_row) {
            for (int start_column = 0; start_column < columns; ++start_column) {
                if (grid[start_row][start_column] == -1 || visited[start_row][start_column]) {
                    continue;
                }
                visited[start_row][start_column] = true;
                vector<pair<int, int>> stack{{start_row, start_column}};
                long long size = 0;
                long long values = 0;
                while (!stack.empty()) {
                    auto [r, c] = stack.back();
                    stack.pop_back();
                    ++size;
                    values += grid[r][c];
                    for (auto [dr, dc] : {pair{1, 0}, pair{-1, 0}, pair{0, 1}, pair{0, -1}}) {
                        int nr = r + dr;
                        int nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] != -1 && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            stack.emplace_back(nr, nc);
                        }
                    }
                }
                total += values;
                components.emplace_back(size, values);
            }
        }
        long long answer = 0;
        for (auto [size, values] : components) {
            answer += size * (total - values);
        }
        return answer;
    }
};
