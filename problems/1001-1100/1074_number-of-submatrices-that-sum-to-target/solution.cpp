class Solution {
  public:
    int numSubmatrixSumTarget(vector<vector<int>> &matrix, int target) {
        int rows = (int)matrix.size();
        int cols = (int)matrix[0].size();

        vector<vector<int>> vpref(rows + 1, vector<int>(cols, 0));
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                vpref[r + 1][c] = vpref[r][c] + matrix[r][c];
            }
        }

        int count = 0;
        for (int top = 0; top < rows; top++) {
            for (int bottom = top; bottom < rows; bottom++) {
                unordered_map<int, int> hist;
                hist[0] = 1;
                int running = 0;
                for (int c = 0; c < cols; c++) {
                    int colSum = vpref[bottom + 1][c] - vpref[top][c];
                    running += colSum;
                    auto it = hist.find(running - target);
                    if (it != hist.end())
                        count += it->second;
                    hist[running] += 1;
                }
            }
        }
        return count;
    }
};
