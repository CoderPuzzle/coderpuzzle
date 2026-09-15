class Solution {
  public:
    bool hasPath(vector<vector<int>> &maze, vector<int> &start, vector<int> &destination) {
        // The ball begins at rest, so the start cell is itself a stopping
        // position and seeds the queue.
        queue<pair<int, int>> pending;
        vector<vector<bool>> stopped(maze.size(), vector<bool>(maze[0].size(), false));
        pending.push({start[0], start[1]});
        stopped[start[0]][start[1]] = true;
        const int dr[4] = {-1, 1, 0, 0};
        const int dc[4] = {0, 0, -1, 1};
        while (!pending.empty()) {
            pair<int, int> cell = pending.front();
            pending.pop();
            int row = cell.first;
            int col = cell.second;
            if (row == destination[0] && col == destination[1]) {
                return true;
            }
            // A roll is deterministic, so each stop has at most four
            // successors — the rest cells of its four rolls — and every
            // one of them is scheduled exactly once.
            for (int d = 0; d < 4; ++d) {
                pair<int, int> rest = roll(maze, row, col, dr[d], dc[d]);
                if (!stopped[rest.first][rest.second]) {
                    stopped[rest.first][rest.second] = true;
                    pending.push(rest);
                }
            }
        }
        return false;
    }

  private:
    pair<int, int> roll(vector<vector<int>> &maze, int row, int col, int dr, int dc) {
        // The border acts as a wall, so leaving the grid ends the roll
        // just like a 1 cell does.
        while (true) {
            int nextRow = row + dr;
            int nextCol = col + dc;
            if (nextRow < 0 || nextRow >= (int)maze.size() || nextCol < 0 || nextCol >= (int)maze[0].size()) {
                break;
            }
            if (maze[nextRow][nextCol] == 1) {
                break;
            }
            row = nextRow;
            col = nextCol;
        }
        return {row, col};
    }
};
