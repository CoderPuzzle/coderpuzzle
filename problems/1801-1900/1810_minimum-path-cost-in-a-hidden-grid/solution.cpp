#include <array>
#include <deque>
#include <limits>
#include <queue>
#include <unordered_map>
#include <utility>
#include <vector>

class GridMaster;

class Solution {
  public:
    int findMinimumPath(GridMaster &maze) {
        // Iterative DFS keeps the walker physically on the DFS tree: move to
        // a child when pushing, move back when popping. Each discovered cell
        // records the toll move() reported on entering it.
        std::unordered_map<long long, int> cost;
        cost[key(0, 0)] = 0;
        bool found = maze.isTarget();
        int goalR = 0, goalC = 0;

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
                if (maze.canMove(std::string(1, direction)) && cost.find(key(nr, nc)) == cost.end()) {
                    cost[key(nr, nc)] = maze.move(std::string(1, direction));
                    if (maze.isTarget()) {
                        found = true;
                        goalR = nr;
                        goalC = nc;
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

        if (!found) {
            return -1;
        }
        // Dijkstra over the surveyed tolls: settle cheapest-first, skip stale
        // heap entries, relax neighbours with the entered cell's toll.
        const long long INF = std::numeric_limits<long long>::max();
        std::unordered_map<long long, long long> dist;
        std::priority_queue<std::pair<long long, long long>, std::vector<std::pair<long long, long long>>,
                            std::greater<std::pair<long long, long long>>>
            heap;
        dist[key(0, 0)] = 0;
        heap.push({0, key(0, 0)});
        while (!heap.empty()) {
            auto [du, k] = heap.top();
            heap.pop();
            if (du > dist[k]) {
                continue;
            }
            int r = static_cast<int>((k >> 16) - OFFSET);
            int c = static_cast<int>((k & 0xFFFF) - OFFSET);
            for (int i = 0; i < 4; i++) {
                int nr = r + DR[i], nc = c + DC[i];
                auto step = cost.find(key(nr, nc));
                if (step != cost.end()) {
                    long long nd = du + step->second;
                    auto record = dist.find(key(nr, nc));
                    if (record == dist.end() || nd < record->second) {
                        dist[key(nr, nc)] = nd;
                        heap.push({nd, key(nr, nc)});
                    }
                }
            }
        }
        auto answer = dist.find(key(goalR, goalC));
        return answer == dist.end() ? -1 : static_cast<int>(answer->second);
    }

  private:
    static constexpr char DIRS[5] = "UDLR";
    static constexpr int DR[4] = {-1, 1, 0, 0};
    static constexpr int DC[4] = {0, 0, -1, 1};
    static constexpr char BACK[5] = "DURL";
    static constexpr int OFFSET = 200; // relative coords stay within +/-99

    static long long key(int r, int c) { return (static_cast<long long>(r + OFFSET) << 16) | (c + OFFSET); }
};
