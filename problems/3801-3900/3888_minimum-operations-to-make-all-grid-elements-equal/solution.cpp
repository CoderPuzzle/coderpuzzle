#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    long long minOperations(vector<vector<int>> &grid, int k) {
        int m = (int)grid.size();
        int n = (int)grid[0].size();
        // Every operation count is an affine function A * T + B of the target
        // T, with A always 0 or 1. Two 2D prefix sums answer the "coverage
        // from already-placed blocks" query for each cell in O(1).
        vector<vector<long long>> pa(m + 1, vector<long long>(n + 1, 0));
        vector<vector<long long>> pb(m + 1, vector<long long>(n + 1, 0));
        bool hasFixed = false;
        long long fixedT = 0; // T fixed by a boundary cell
        bool hasLow = false;
        long long lowT = 0; // lower bound on T from X >= 0 (A == 1 cells)
        long long sumA = 0;
        long long sumB = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                int r1 = max(0, i - k + 1);
                int c1 = max(0, j - k + 1);
                long long covA = rect(pa, r1, i - 1, c1, j) + rect(pa, i, i, c1, j - 1);
                long long covB = rect(pb, r1, i - 1, c1, j) + rect(pb, i, i, c1, j - 1);
                long long a;
                long long b;
                if (i <= m - k && j <= n - k) {
                    a = 1 - covA;
                    b = -(long long)grid[i][j] - covB;
                    if (a == 1) {
                        if (!hasLow || -b > lowT) {
                            lowT = -b;
                            hasLow = true;
                        }
                    } else if (a == 0) {
                        if (b < 0) {
                            return -1;
                        }
                    } else {
                        return -1;
                    }
                    sumA += a;
                    sumB += b;
                } else {
                    // Boundary cell: grid[i][j] + cov must equal T.
                    if (covA == 1) {
                        if ((long long)grid[i][j] + covB != 0) {
                            return -1;
                        }
                    } else if (covA == 0) {
                        long long t = (long long)grid[i][j] + covB;
                        if (!hasFixed) {
                            hasFixed = true;
                            fixedT = t;
                        } else if (fixedT != t) {
                            return -1;
                        }
                    } else {
                        return -1;
                    }
                    a = 0;
                    b = 0;
                }
                pa[i + 1][j + 1] = pa[i][j + 1] + pa[i + 1][j] - pa[i][j] + a;
                pb[i + 1][j + 1] = pb[i][j + 1] + pb[i + 1][j] - pb[i][j] + b;
            }
        }
        if (hasFixed) {
            if (hasLow && fixedT < lowT) {
                return -1;
            }
            return sumA * fixedT + sumB;
        }
        long long t = hasLow ? lowT : 0;
        return sumA * t + sumB;
    }

  private:
    static long long rect(const vector<vector<long long>> &p, int r1, int r2, int c1, int c2) {
        if (r1 > r2 || c1 > c2) {
            return 0;
        }
        return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];
    }
};
