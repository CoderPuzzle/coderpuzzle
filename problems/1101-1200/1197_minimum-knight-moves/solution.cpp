#include <queue>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int minKnightMoves(int x, int y) {
        // Mirror symmetry folds every target into the first quadrant; a
        // knight never needs to leave the window two squares past it.
        const std::vector<std::pair<int, int>> moves = {{1, 2},   {2, 1},   {2, -1}, {1, -2},
                                                        {-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}};
        int tx = abs(x), ty = abs(y);
        auto key = [](int nx, int ny) { return ((long long)(nx + 400) << 20) | (ny + 400); };
        std::unordered_set<long long> seen;
        seen.insert(key(0, 0));
        std::queue<std::pair<int, int>> queue;
        queue.push({0, 0});
        int steps = 0;
        while (!queue.empty()) {
            int size = (int)queue.size();
            for (int s = 0; s < size; s++) {
                auto [cx, cy] = queue.front();
                queue.pop();
                if (cx == tx && cy == ty) {
                    return steps;
                }
                for (auto &[dx, dy] : moves) {
                    int nx = cx + dx, ny = cy + dy;
                    if (-2 <= nx && nx <= tx + 2 && -2 <= ny && ny <= ty + 2 && seen.insert(key(nx, ny)).second) {
                        queue.push({nx, ny});
                    }
                }
            }
            steps++;
        }
        throw std::runtime_error("unreachable");
    }
};
