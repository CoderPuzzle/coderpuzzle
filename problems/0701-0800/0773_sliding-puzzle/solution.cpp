class Solution {
  public:
    int slidingPuzzle(vector<vector<int>> &board) {
        static const string TARGET = "123450";
        // Adjacency of each row-major cell on the 2x3 board (-1 = none),
        // so the expansion needs no bounds logic.
        static const int NEIGHBORS[6][3] = {{1, 3, -1}, {0, 2, 4}, {1, 5, -1}, {0, 4, -1}, {3, 5, 1}, {2, 4, -1}};
        // Boards are nodes, slides of the 0 are edges: BFS gives the
        // minimum move count over at most 6! = 720 states, encoded as
        // strings so they hash into a visited set.
        string start;
        for (const auto &row : board) {
            for (int v : row) {
                start.push_back('0' + v);
            }
        }
        if (start == TARGET)
            return 0;
        unordered_set<string> visited;
        visited.insert(start);
        queue<pair<string, int>> q;
        q.push({start, 0});
        while (!q.empty()) {
            auto [state, moves] = q.front();
            q.pop();
            size_t zero = state.find('0');
            for (int i = 0; i < 3; i++) {
                int nxt = NEIGHBORS[zero][i];
                if (nxt < 0)
                    continue;
                // Swap the 0 with a neighboring tile to make a successor.
                string newState = state;
                swap(newState[zero], newState[nxt]);
                if (newState == TARGET)
                    return moves + 1;
                // insert() reports novelty, so each state expands once.
                if (visited.insert(newState).second) {
                    q.push({newState, moves + 1});
                }
            }
        }
        // Queue exhausted: the target sits in the unreachable half of the
        // permutations (odd parity).
        return -1;
    }
};
