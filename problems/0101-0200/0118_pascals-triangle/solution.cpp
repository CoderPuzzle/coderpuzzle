class Solution {
  public:
    vector<vector<int>> generate(int numRows) {
        // The triangle defines its own recurrence: row 0 is a lone 1, and every
        // later row carries a 1 at each end with each interior cell the sum of
        // the two cells directly above it. Building top-down means the row
        // above is already complete when any of its sums are read.
        vector<vector<int>> rows(numRows);
        rows[0] = {1};
        for (int i = 1; i < numRows; ++i) {
            const vector<int> &above = rows[i - 1];
            vector<int> row(i + 1);
            row[0] = 1;
            // Interior cell j is above[j - 1] + above[j]: the two cells that
            // touch it from directly above, with the edge 1s supplying the
            // missing neighbors of the outermost interior cells.
            for (int j = 1; j < i; ++j) {
                row[j] = above[j - 1] + above[j];
            }
            row[i] = 1;
            rows[i] = move(row);
        }
        return rows;
    }
};
