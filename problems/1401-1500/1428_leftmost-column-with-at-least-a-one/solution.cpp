class BinaryMatrix;

class Solution {
  public:
    int leftMostColumnWithOne(BinaryMatrix &matrix) {
        vector<int> size = matrix.dimensions();
        int rows = size[0];
        int cols = size[1];
        // Staircase from the top-right corner: on a 1 this is the best
        // column so far (step left — nothing further right matters), on a 0
        // this row is exhausted at or after this column (step down).
        int answer = -1;
        int row = 0;
        int col = cols - 1;
        while (row < rows && col >= 0) {
            if (matrix.get(row, col) == 1) {
                answer = col;
                col -= 1;
            } else {
                row += 1;
            }
        }
        return answer;
    }
};
