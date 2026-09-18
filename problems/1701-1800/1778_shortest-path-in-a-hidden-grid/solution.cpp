#include <array>
#include <deque>
#include <unordered_map>
#include <unordered_set>

class GridMaster;

class Solution {
  public:
    int findShortestPath(GridMaster &maze) {
        // Iterative DFS keeps the walker physically on the DFS tree: move to
        // a child when pushing, move back when popping. Each reachable cell
        // is entered exactly once and probed with isTarget().
        std::unordered_set<long long> seen;
        seen.insert(key(0, 0));
        long long targetKey = maze.isTarget() ? key(0, 0) : -1;

        std::vector<std::array<int, 3>> stack; // r, c, next direction index
        std::vector<int> parentDirs;           // direction index taken from the parent
        stack.push_back({0, 0, 0});
        parentDirs.push_back(-1);
        while (!stack.empty()) {
            std::array<int, 3> &frame = stack.back();
            int r = frame[0], c = frame[1], idx = frame[2];
            bool pushed = false;
            while (idx < 4) {
                char direction = DIRS[idx];
                int nr = r + DR[idx], nc = c + DC[idx];
                idx += 1;
                if (maze.canMove(std::string(1, direction)) && seen.insert(key(nr, nc)).second) {
                    maze.move(std::string(1, direction));
                    if (maze.isTarget()) {
                        targetKey = key(nr, nc);
                    }
                    frame[2] = idx;
                    stack.push_back({nr, nc, 0});
                    parentDirs.push_back(idx - 1);
                    pushed = true;
                    break;
                }
            }
            if (!pushed) {
                stack.pop_back();
                int parentDir = parentDirs.back();
                parentDirs.pop_back();
                if (!stack.empty() && parentDir >= 0) {
                    maze.move(std::string(1, BACK[parentDir]));
                }
            }
        }

        if (targetKey < 0) {
            return -1;
        }
        // Unit edge weights: plain BFS over the discovered map.
        std::unordered_map<long long, int> dist;
        dist[key(0, 0)] = 0;
        std::deque<std::pair<int, int>> queue;
        queue.push_back({0, 0});
        while (!queue.empty()) {
            auto [r, c] = queue.front();
            queue.pop_front();
            int d = dist[key(r, c)];
            for (int i = 0; i < 4; i++) {
                int nr = r + DR[i], nc = c + DC[i];
                if (seen.count(key(nr, nc)) && !dist.count(key(nr, nc))) {
                    dist[key(nr, nc)] = d + 1;
                    queue.push_back({nr, nc});
                }
            }
        }
        return dist[targetKey];
    }

  private:
    static constexpr char DIRS[5] = "UDLR";
    static constexpr int DR[4] = {-1, 1, 0, 0};
    static constexpr int DC[4] = {0, 0, -1, 1};
    static constexpr char BACK[5] = "DURL";
    static constexpr int OFFSET = 512; // relative coords stay within +/-499

    static long long key(int r, int c) { return (static_cast<long long>(r + OFFSET) << 16) | (c + OFFSET); }
};
