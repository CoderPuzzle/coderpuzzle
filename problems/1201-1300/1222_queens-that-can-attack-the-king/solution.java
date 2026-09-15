import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] queensAttacktheKing(int[][] queens, int[] king) {
        boolean[][] board = new boolean[8][8];
        for (int[] queen : queens) board[queen[0]][queen[1]] = true;
        List<int[]> found = new ArrayList<>();
        for (int dx = -1; dx <= 1; ++dx) {
            for (int dy = -1; dy <= 1; ++dy) {
                if (dx == 0 && dy == 0) continue;
                // First queen on each ray attacks; she also blocks the rest.
                int x = king[0] + dx,
                    y = king[1] + dy;
                while (x >= 0 && x < 8 && y >= 0 && y < 8) {
                    if (board[x][y]) {
                        found.add(new int[] { x, y });
                        break;
                    }
                    x += dx;
                    y += dy;
                }
            }
        }
        return found.toArray(new int[0][]);
    }
}
