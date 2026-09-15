class Solution {
  public:
    int mostFrequentPrime(vector<vector<int>> &mat) {
        // From every cell, march each of the eight directions straight to
        // the matrix edge; a path is fully described by its start and
        // direction.
        const vector<pair<int, int>> directions = {{0, 1},  {1, 1},   {1, 0},  {1, -1},
                                                   {0, -1}, {-1, -1}, {-1, 0}, {-1, 1}};
        unordered_map<int, int> counts;
        for (int i = 0; i < (int)mat.size(); ++i) {
            for (int j = 0; j < (int)mat[0].size(); ++j) {
                for (const auto &[di, dj] : directions) {
                    long long value = mat[i][j];
                    int x = i + di, y = j + dj;
                    while (x >= 0 && x < (int)mat.size() && y >= 0 && y < (int)mat[0].size()) {
                        // Appending one digit materializes the number formed
                        // at this step, so every step tallies on its own.
                        value = value * 10 + mat[x][y];
                        if (value > 10 && isPrime(value))
                            ++counts[value];
                        x += di;
                        y += dj;
                    }
                }
            }
        }
        // Highest frequency wins, ties toward the larger prime; no candidate
        // at all leaves the answer at -1.
        int best_value = -1, best_count = 0;
        for (const auto &[value, count] : counts) {
            if (count > best_count || (count == best_count && value > best_value)) {
                best_value = value;
                best_count = count;
            }
        }
        return best_value;
    }

  private:
    bool isPrime(long long value) {
        if (value % 2 == 0)
            return value == 2;
        for (long long factor = 3; factor * factor <= value; factor += 2)
            if (value % factor == 0)
                return false;
        return true;
    }
};
