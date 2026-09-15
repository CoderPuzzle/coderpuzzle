class Solution {
  public:
    bool checkValid(vector<vector<int>> &matrix) {
        int size = static_cast<int>(matrix.size());
        for (int index = 0; index < size; ++index) {
            vector<char> rowSeen(size + 1, false);
            vector<char> colSeen(size + 1, false);
            for (int offset = 0; offset < size; ++offset) {
                int rowValue = matrix[index][offset];
                int colValue = matrix[offset][index];
                if (rowSeen[rowValue] || colSeen[colValue]) {
                    return false;
                }
                rowSeen[rowValue] = true;
                colSeen[colValue] = true;
            }
        }
        return true;
    }
};
