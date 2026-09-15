import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int snakesAndLadders(int[][] board) {
        // The game is an unweighted shortest-path search: squares are nodes
        // and dice rolls are edges of cost 1, so BFS from square 1 finds the
        // fewest moves. Flatten the board with the boustrophedon walk (bottom
        // row left to right, next row right to left, flipping each row up);
        // a roll landing on square s resolves to cells[s] when that entry is
        // not -1 and to s otherwise — exactly one mandatory teleport, never
        // chained, since the landing square is enqueued as an ordinary node.
        // Each node expands to the at-most-six destinations in
        // [curr + 1, min(curr + 6, n * n)], and an empty level means n * n
        // is unreachable.
        int n = board.length;
        int target = n * n;
        int[] cells = new int[target + 1];
        int square = 1;
        for (int rowFromBottom = 0; rowFromBottom < n; ++rowFromBottom) {
            int[] row = board[n - 1 - rowFromBottom];
            for (int column = 0; column < n; ++column) {
                cells[square++] = row[rowFromBottom % 2 == 0 ? column : n - 1 - column];
            }
        }
        boolean[] visited = new boolean[target + 1];
        visited[1] = true;
        Queue<Integer> current = new ArrayDeque<>();
        current.add(1);
        int moves = 0;
        while (!current.isEmpty()) {
            ++moves;
            Queue<Integer> reachable = new ArrayDeque<>();
            for (int curr : current) {
                int furthest = Math.min(curr + 6, target);
                for (int next = curr + 1; next <= furthest; ++next) {
                    int destination = cells[next] != -1 ? cells[next] : next;
                    if (destination == target) {
                        return moves;
                    }
                    if (!visited[destination]) {
                        visited[destination] = true;
                        reachable.add(destination);
                    }
                }
            }
            current = reachable;
        }
        return -1;
    }
}
