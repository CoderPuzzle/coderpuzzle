#include <string>
#include <vector>

// Nothing about a position matters except the two cells and whose turn it
// is — at most 64*64*2 = 8192 states, so label every state outright: mouse
// on food is a Mouse win; cat on food or on the mouse is a Cat win. Then
// work backward with degree counting — a state whose mover can jump into a
// state already won by that mover inherits the win, and any other labeled
// successor retires one of its moves, so a state whose last move dies is
// the opponent's. States never labeled are draws the mouse survives forever
// without eating, which the 1000-turn rule awards to Cat. Per-cell jump
// lists (slide up to the limit, stop before the first wall, staying counts)
// drive both the labeling and its reverse edges.
class Solution {
  public:
    bool canMouseWin(vector<string> &grid, int catJump, int mouseJump) {
        int rows = grid.size(), cols = grid[0].size();
        vector<int> idx(rows * cols, -1);
        int n = 0, mouse0 = 0, cat0 = 0, food = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                char ch = grid[r][c];
                if (ch != '#') {
                    idx[r * cols + c] = n++;
                    if (ch == 'M')
                        mouse0 = idx[r * cols + c];
                    else if (ch == 'C')
                        cat0 = idx[r * cols + c];
                    else if (ch == 'F')
                        food = idx[r * cols + c];
                }
            }
        }
        vector<vector<int>> mouseMoves = jumpLists(grid, rows, cols, idx, n, mouseJump);
        vector<vector<int>> catMoves = jumpLists(grid, rows, cols, idx, n, catJump);
        vector<vector<int>> mouseBack = reversed(mouseMoves, n);
        vector<vector<int>> catBack = reversed(catMoves, n);
        vector<int> label(2 * n * n, 0); // 0 unknown, 1 Mouse win, 2 Cat win
        vector<int> degree(2 * n * n, 0);
        vector<int> queue;
        queue.reserve(2 * n * n);
        for (int m = 0; m < n; m++) {
            for (int c = 0; c < n; c++) {
                for (int t = 0; t < 2; t++) {
                    int s = (m * n + c) * 2 + t;
                    degree[s] = (int)(t == 0 ? mouseMoves[m] : catMoves[c]).size();
                    if (c == food || m == c) {
                        label[s] = 2;
                        queue.push_back(s);
                    } else if (m == food) {
                        label[s] = 1;
                        queue.push_back(s);
                    }
                }
            }
        }
        for (size_t head = 0; head < queue.size(); head++) {
            int s = queue[head];
            int t = s & 1, base = s >> 1, m = base / n, c = base % n;
            int win = label[s];
            if (t == 1) {
                for (int m2 : mouseBack[m]) { // predecessors: the mouse just moved
                    int p = (m2 * n + c) * 2;
                    if (label[p] == 0) {
                        if (win == 1) {
                            label[p] = 1;
                            queue.push_back(p);
                        } else if (--degree[p] == 0) {
                            label[p] = 2;
                            queue.push_back(p);
                        }
                    }
                }
            } else {
                for (int c2 : catBack[c]) { // predecessors: the cat just moved
                    int p = (m * n + c2) * 2 + 1;
                    if (label[p] == 0) {
                        if (win == 2) {
                            label[p] = 2;
                            queue.push_back(p);
                        } else if (--degree[p] == 0) {
                            label[p] = 1;
                            queue.push_back(p);
                        }
                    }
                }
            }
        }
        return label[(mouse0 * n + cat0) * 2] == 1;
    }

  private:
    static vector<vector<int>> jumpLists(const vector<string> &grid, int rows, int cols, const vector<int> &idx, int n,
                                         int jump) {
        const int dr[4] = {0, 0, 1, -1}, dc[4] = {1, -1, 0, 0};
        vector<vector<int>> out(n);
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int i = idx[r * cols + c];
                if (i < 0) {
                    continue;
                }
                out[i].push_back(i); // staying in place is a move too
                for (int d = 0; d < 4; d++) {
                    for (int s = 1; s <= jump; s++) {
                        int rr = r + dr[d] * s, cc = c + dc[d] * s;
                        if (rr < 0 || rr >= rows || cc < 0 || cc >= cols || grid[rr][cc] == '#') {
                            break;
                        }
                        out[i].push_back(idx[rr * cols + cc]);
                    }
                }
            }
        }
        return out;
    }

    static vector<vector<int>> reversed(const vector<vector<int>> &moves, int n) {
        vector<vector<int>> back(n);
        for (int i = 0; i < n; i++) {
            for (int j : moves[i]) {
                back[j].push_back(i);
            }
        }
        return back;
    }
};
