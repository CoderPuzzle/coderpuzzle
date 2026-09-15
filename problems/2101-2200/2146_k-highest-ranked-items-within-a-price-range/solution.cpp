#include <algorithm>
#include <array>
#include <queue>
#include <utility>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<vector<int>> highestRankedKItems(vector<vector<int>> &grid, vector<int> &pricing, vector<int> &start,
                                            int k) {
        int rows = static_cast<int>(grid.size());
        int columns = static_cast<int>(grid[0].size());
        vector<vector<int>> distance(rows, vector<int>(columns, -1));
        queue<pair<int, int>> cells;
        cells.push({start[0], start[1]});
        distance[start[0]][start[1]] = 0;

        vector<array<int, 4>> candidates;
        const int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        while (!cells.empty()) {
            auto [row, column] = cells.front();
            cells.pop();

            int price = grid[row][column];
            if (pricing[0] <= price && price <= pricing[1]) {
                candidates.push_back({distance[row][column], price, row, column});
            }

            for (const auto &direction : directions) {
                int nextRow = row + direction[0];
                int nextColumn = column + direction[1];
                if (nextRow >= 0 && nextRow < rows && nextColumn >= 0 && nextColumn < columns &&
                    grid[nextRow][nextColumn] != 0 && distance[nextRow][nextColumn] == -1) {
                    distance[nextRow][nextColumn] = distance[row][column] + 1;
                    cells.push({nextRow, nextColumn});
                }
            }
        }

        sort(candidates.begin(), candidates.end());
        vector<vector<int>> answer;
        int count = min(k, static_cast<int>(candidates.size()));
        answer.reserve(count);
        for (int index = 0; index < count; ++index) {
            answer.push_back({candidates[index][2], candidates[index][3]});
        }
        return answer;
    }
};
