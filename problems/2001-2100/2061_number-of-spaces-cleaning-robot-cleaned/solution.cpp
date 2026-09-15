class Solution {
  public:
    int numberOfCleanRooms(vector<vector<int>> &room) {
        int rows = static_cast<int>(room.size());
        int cols = static_cast<int>(room[0].size());
        const int dr[4] = {0, 1, 0, -1};
        const int dc[4] = {1, 0, -1, 0};
        vector<char> seen(rows * cols * 4, false);
        vector<char> cleaned(rows * cols, false);
        int row = 0;
        int col = 0;
        int direction = 0;
        int cleanCount = 0;

        while (!seen[(row * cols + col) * 4 + direction]) {
            seen[(row * cols + col) * 4 + direction] = true;
            int cell = row * cols + col;
            if (!cleaned[cell]) {
                cleaned[cell] = true;
                ++cleanCount;
            }

            int nextRow = row + dr[direction];
            int nextCol = col + dc[direction];
            if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols || room[nextRow][nextCol] == 1) {
                direction = (direction + 1) % 4;
            } else {
                row = nextRow;
                col = nextCol;
            }
        }
        return cleanCount;
    }
};
