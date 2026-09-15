class Solution {
  public:
    // Child 1 is pinned to the main diagonal. Children 2 and 3 each
    // walk their own off-diagonal triangle in n-1 steps (their row /
    // column advances one per move, and the diagonal can only be
    // touched by spending every later move on it, which collects
    // nothing), so solve them independently; diagonal cells and the
    // shared final cell are counted once, via the diagonal. Child 3 is
    // child 2 with the grid transposed (swapped reads).
    long long maxCollectedFruits(vector<vector<int>> &fruits) {
        int n = fruits.size();
        long long total = 0;
        for (int i = 0; i < n; i++) {
            total += fruits[i][i];
        }
        total += triangle(fruits, false);
        total += triangle(fruits, true);
        return total;
    }

  private:
    // Best walk from the top-right corner, one row per step, staying
    // strictly right of the diagonal, final cell excluded (-1 marks
    // not-yet-reachable cells; values >= 0).
    long long triangle(vector<vector<int>> &m, bool swapped) {
        int n = m.size();
        vector<long long> prev(n, -1);
        prev[n - 1] = swapped ? m[n - 1][0] : m[0][n - 1];
        for (int i = 1; i < n - 1; i++) {
            vector<long long> cur(n, -1);
            for (int j = i + 1; j < n; j++) {
                long long best = prev[j - 1];
                if (prev[j] > best) {
                    best = prev[j];
                }
                if (j + 1 < n && prev[j + 1] > best) {
                    best = prev[j + 1];
                }
                if (best >= 0) {
                    cur[j] = best + (swapped ? m[j][i] : m[i][j]);
                }
            }
            prev = cur;
        }
        return prev[n - 1];
    }
};
