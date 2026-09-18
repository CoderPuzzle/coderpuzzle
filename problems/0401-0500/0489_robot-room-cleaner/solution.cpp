class Robot;

class Solution {
  public:
    void cleanRoom(Robot &sweeper) {
        const int dirs[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}}; // up, right, down, left
        std::set<std::pair<int, int>> visited;
        visited.insert({0, 0});
        sweeper.clean();
        // Iterative spiral DFS (a 100 x 200 grid overflows recursive DFS):
        // a frame is [row, col, entry direction, next relative direction].
        // Invariant: iteration i of the top frame starts with the sweeper
        // facing (entry + i) % 4, and every iteration ends with exactly one
        // turnRight — either directly (blocked ahead) or deferred, arriving
        // from the child via the back-out sequence below.
        std::vector<std::array<int, 4>> stack;
        stack.push_back({0, 0, 0, 0});
        while (!stack.empty()) {
            std::array<int, 4> frame = stack.back();
            int row = frame[0], col = frame[1], entry = frame[2], index = frame[3];
            if (index == 4) {
                stack.pop_back();
                if (!stack.empty()) {
                    // Back out of the child: about-face, retrace the step,
                    // about-face, then the parent's trailing turnRight into
                    // its next direction.
                    sweeper.turnRight();
                    sweeper.turnRight();
                    sweeper.move();
                    sweeper.turnRight();
                    sweeper.turnRight();
                    sweeper.turnRight();
                }
                continue;
            }
            int face = (entry + index) % 4;
            int nrow = row + dirs[face][0], ncol = col + dirs[face][1];
            if (visited.find({nrow, ncol}) == visited.end() && sweeper.move()) {
                visited.insert({nrow, ncol});
                sweeper.clean();
                stack.back()[3] = index + 1;
                stack.push_back({nrow, ncol, face, 0});
            } else {
                sweeper.turnRight();
                stack.back()[3] = index + 1;
            }
        }
    }
};
