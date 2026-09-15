#include <algorithm>
#include <vector>

class Solution {
  public:
    vector<vector<int>> sortTheStudents(vector<vector<int>> &score, int k) {
        // Sort the rows by their column-k entry, largest first:
        // extracting a comparison key is O(1) row indexing. Scores are
        // pairwise distinct across the whole matrix, so ties never occur
        // and the descending order is unique. Returns a copy; the input
        // is left untouched.
        vector<vector<int>> rows = score;
        std::sort(rows.begin(), rows.end(), [k](const vector<int> &a, const vector<int> &b) { return a[k] > b[k]; });
        return rows;
    }
};
