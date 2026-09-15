class Solution {
  public:
    int snakesAndLadders(vector<vector<int>> &board) {
        // The game is an unweighted shortest-path search: squares are nodes
        // and dice rolls are edges of cost 1, so BFS from square 1 finds the
        // fewest moves. Flatten the board with the boustrophedon walk (bottom
        // row left to right, next row right to left, flipping each row up);
        // a roll landing on square s resolves to cells[s] when that entry is
        // not -1 and to s otherwise — exactly one mandatory teleport, never
        // chained, since the landing square is enqueued as an ordinary node.
        // Each node expands to the at-most-six destinations in
        // [curr + 1, min(curr + 6, n * n)], and an empty level means n * n
        // is unreachable.
        int n = board.size();
        int target = n * n;
        vector<int> cells(target + 1);
        int square = 1;
        for (int rowFromBottom = 0; rowFromBottom < n; ++rowFromBottom) {
            const vector<int> &row = board[n - 1 - rowFromBottom];
            for (int column = 0; column < n; ++column) {
                cells[square++] = rowFromBottom % 2 == 0 ? row[column] : row[n - 1 - column];
            }
        }
        vector<bool> visited(target + 1, false);
        visited[1] = true;
        vector<int> current = {1};
        int moves = 0;
        while (!current.empty()) {
            ++moves;
            vector<int> reachable;
            for (int curr : current) {
                int furthest = min(curr + 6, target);
                for (int next = curr + 1; next <= furthest; ++next) {
                    int destination = cells[next] != -1 ? cells[next] : next;
                    if (destination == target) {
                        return moves;
                    }
                    if (!visited[destination]) {
                        visited[destination] = true;
                        reachable.push_back(destination);
                    }
                }
            }
            current = move(reachable);
        }
        return -1;
    }
};
