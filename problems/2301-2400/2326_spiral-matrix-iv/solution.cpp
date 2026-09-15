class Solution {
  public:
    vector<vector<int>> spiralMatrix(int m, int n, ListNode *head) {
        // The -1 fill doubles as the unvisited marker. A cursor advances along
        // the clockwise right/down/left/up cycle and rotates 90 degrees whenever
        // the candidate cell leaves the grid or was already written; it stops
        // when the list runs out, leaving every unwritten cell at -1.
        vector<vector<int>> matrix(m, vector<int>(n, -1));
        const int directions[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int row = 0, column = 0, direction = 0;
        ListNode *node = head;
        while (node != nullptr) {
            matrix[row][column] = node->val;
            node = node->next;
            if (node == nullptr)
                break;
            int next_row = row + directions[direction][0];
            int next_column = column + directions[direction][1];
            if (next_row < 0 || next_row >= m || next_column < 0 || next_column >= n ||
                matrix[next_row][next_column] != -1) {
                direction = (direction + 1) % 4;
                next_row = row + directions[direction][0];
                next_column = column + directions[direction][1];
            }
            row = next_row;
            column = next_column;
        }
        return matrix;
    }
};
