class Solution {
  public:
    static constexpr int GRID_SIZE = 1000000;

    bool isEscapePossible(vector<vector<int>> &blocked, vector<int> &source, vector<int> &target) {
        unordered_set<long long> blockedSet;
        for (auto &cell : blocked) {
            blockedSet.insert(key(cell[0], cell[1]));
        }
        // With n blocked cells, the largest pocket they can wall off is the
        // triangular staircase in a grid corner: n * (n - 1) / 2 cells. If a
        // flood-fill from an endpoint ever visits more cells than that, the
        // endpoint cannot be trapped, so the fill can stop early instead of
        // exploring the (unmaterializable) rest of the grid.
        long long n = (long long)blockedSet.size();
        long long maxEnclosedArea = n * (n - 1) / 2;

        // source cannot reach past its own pocket boundary AND target cannot
        // reach past its own pocket boundary -- both must escape their local
        // neighborhood for a path to exist between them.
        return canEscapeLocally(source, target, blockedSet, maxEnclosedArea) &&
               canEscapeLocally(target, source, blockedSet, maxEnclosedArea);
    }

  private:
    long long key(int x, int y) { return (long long)x * GRID_SIZE + y; }

    bool canEscapeLocally(vector<int> &start, vector<int> &goal, unordered_set<long long> &blockedSet,
                          long long maxEnclosedArea) {
        unordered_set<long long> visited;
        vector<pair<int, int>> stack;
        visited.insert(key(start[0], start[1]));
        stack.push_back({start[0], start[1]});
        int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        while (!stack.empty()) {
            if ((long long)visited.size() > maxEnclosedArea) {
                return true;
            }
            auto [x, y] = stack.back();
            stack.pop_back();
            for (auto &direction : directions) {
                int nx = x + direction[0];
                int ny = y + direction[1];
                if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
                    continue;
                }
                long long k = key(nx, ny);
                if (blockedSet.count(k) || visited.count(k)) {
                    continue;
                }
                if (nx == goal[0] && ny == goal[1]) {
                    return true;
                }
                visited.insert(k);
                stack.push_back({nx, ny});
            }
        }
        return false;
    }
};
