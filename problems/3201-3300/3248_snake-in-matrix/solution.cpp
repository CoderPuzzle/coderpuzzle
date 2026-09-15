class Solution {
  public:
    int finalPositionOfSnake(int n, vector<string> &commands) {
        // Each command moves exactly one coordinate by one step; the
        // statement's guarantee keeps both within [0, n), so no boundary
        // checks are needed.
        int row = 0, col = 0;
        for (const string &command : commands) {
            if (command == "UP") {
                --row;
            } else if (command == "DOWN") {
                ++row;
            } else if (command == "LEFT") {
                --col;
            } else { // "RIGHT"
                ++col;
            }
        }
        return row * n + col;
    }
};
