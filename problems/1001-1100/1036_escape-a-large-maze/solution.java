import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    private static final int GRID_SIZE = 1_000_000;

    public boolean isEscapePossible(int[][] blocked, int[] source, int[] target) {
        Set<Long> blockedSet = new HashSet<>();
        for (int[] cell : blocked) {
            blockedSet.add(key(cell[0], cell[1]));
        }
        // With n blocked cells, the largest pocket they can wall off is the
        // triangular staircase in a grid corner: n * (n - 1) / 2 cells. If a
        // flood-fill from an endpoint ever visits more cells than that, the
        // endpoint cannot be trapped, so the fill can stop early instead of
        // exploring the (unmaterializable) rest of the grid.
        long n = blockedSet.size();
        long maxEnclosedArea = (n * (n - 1)) / 2;

        // source cannot reach past its own pocket boundary AND target cannot
        // reach past its own pocket boundary -- both must escape their local
        // neighborhood for a path to exist between them.
        return (
            canEscapeLocally(source, target, blockedSet, maxEnclosedArea) &&
            canEscapeLocally(target, source, blockedSet, maxEnclosedArea)
        );
    }

    private boolean canEscapeLocally(int[] start, int[] goal, Set<Long> blockedSet, long maxEnclosedArea) {
        Set<Long> visited = new HashSet<>();
        Deque<int[]> stack = new ArrayDeque<>();
        visited.add(key(start[0], start[1]));
        stack.push(new int[] { start[0], start[1] });
        int[][] directions = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };

        while (!stack.isEmpty()) {
            if (visited.size() > maxEnclosedArea) {
                return true;
            }
            int[] cell = stack.pop();
            for (int[] direction : directions) {
                int nx = cell[0] + direction[0];
                int ny = cell[1] + direction[1];
                if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
                    continue;
                }
                long k = key(nx, ny);
                if (blockedSet.contains(k) || visited.contains(k)) {
                    continue;
                }
                if (nx == goal[0] && ny == goal[1]) {
                    return true;
                }
                visited.add(k);
                stack.push(new int[] { nx, ny });
            }
        }
        return false;
    }

    private long key(int x, int y) {
        return (long) x * GRID_SIZE + y;
    }
}
