class Solution {
  public:
    string kthSmallestPath(vector<int> &destination, int k) {
        int row = destination[0];
        int col = destination[1];
        int n = row + col;
        // binom[i][j] = C(i, j), built as Pascal's triangle up to n so
        // every count is available without computing a factorial; row,
        // col <= 15 keeps every entry well under INT_MAX.
        vector<vector<int>> binom(n + 1, vector<int>(n + 1, 0));
        for (int i = 0; i <= n; i++) {
            binom[i][0] = 1;
            binom[i][i] = 1;
            for (int j = 1; j < i; j++) {
                binom[i][j] = binom[i - 1][j - 1] + binom[i - 1][j];
            }
        }

        int remainingH = col;
        int remainingV = row;
        string path;
        for (int step = 0; step < n; step++) {
            if (remainingH == 0) {
                path.push_back('V');
                remainingV--;
            } else if (remainingV == 0) {
                path.push_back('H');
                remainingH--;
            } else {
                // Completions starting with 'H': the remaining (remainingH
                // - 1) H's and remainingV V's fill the rest of the string
                // in any order, so this count is C(remainingH - 1 +
                // remainingV, remainingV).
                int countIfH = binom[remainingH - 1 + remainingV][remainingV];
                if (k <= countIfH) {
                    path.push_back('H');
                    remainingH--;
                } else {
                    k -= countIfH;
                    path.push_back('V');
                    remainingV--;
                }
            }
        }
        return path;
    }
};
