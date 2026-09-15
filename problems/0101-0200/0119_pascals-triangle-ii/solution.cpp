class Solution {
  public:
    vector<int> getRow(int rowIndex) {
        // One array of edge 1s, folded forward row by row: after pass i its
        // first i + 1 cells hold row i exactly, so the returned array is the
        // only one ever allocated — the O(rowIndex) space the follow-up asks for.
        vector<int> row(rowIndex + 1, 1);
        for (int length = 2; length <= rowIndex; ++length) {
            // Right-to-left: row[j - 1] still holds the previous row's value
            // when row[j] is updated, so row[j] += row[j - 1] is exactly the
            // sum-of-the-two-cells-directly-above recurrence.
            for (int j = length - 1; j > 0; --j) {
                row[j] += row[j - 1];
            }
        }
        return row;
    }
};
