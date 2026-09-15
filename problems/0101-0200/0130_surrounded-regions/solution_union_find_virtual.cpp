class Solution {
  public:
    vector<vector<string>> solve(vector<vector<string>> &board) {
        // Encode the connectivity instead of walking it: one disjoint-set
        // node per cell plus one virtual node standing for the outside, so
        // a region survives exactly when it lands in the virtual node's set.
        int m = board.size();
        int n = board[0].size();
        int outside = m * n;
        vector<int> parent(outside + 1);
        for (int x = 0; x <= outside; ++x) {
            parent[x] = x;
        }
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        auto find = [&parent](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        auto unite = [&](int a, int b) {
            int ra = find(a);
            int rb = find(b);
            if (ra != rb) {
                parent[ra] = rb;
            }
        };
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (board[i][j] != "O") {
                    continue;
                }
                // A border 'O' is an escape route: tying it to the virtual
                // node marks its whole region safe in one stroke.
                if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                    unite(i * n + j, outside);
                }
                // Only the right and lower neighbors are merged, which
                // offers every orthogonal pair to the union exactly once.
                if (i + 1 < m && board[i + 1][j] == "O") {
                    unite(i * n + j, (i + 1) * n + j);
                }
                if (j + 1 < n && board[i][j + 1] == "O") {
                    unite(i * n + j, i * n + j + 1);
                }
            }
        }
        // Every merge is done, so the virtual node's root is now fixed and
        // one lookup per cell decides its fate: an 'O' outside that set has
        // no path to the border, which is exactly what enclosed means.
        int border = find(outside);
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (board[i][j] == "O" && find(i * n + j) != border) {
                    board[i][j] = "X";
                }
            }
        }
        // The capture happened inside the input allocation; the same board,
        // now captured, is what the judge compares.
        return board;
    }
};
