import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    private static final char[] DIRS = { 'U', 'D', 'L', 'R' };
    private static final int[] DR = { -1, 1, 0, 0 };
    private static final int[] DC = { 0, 0, -1, 1 };
    private static final String BACK = "DURL";
    private static final int OFFSET = 512; // relative coords stay within +/-499

    public int findShortestPath(GridMaster master) {
        Map<Long, Boolean> seen = new HashMap<>();
        long startKey = key(0, 0);
        seen.put(startKey, Boolean.TRUE);
        long targetKey = master.isTarget() ? startKey : Long.MIN_VALUE;

        // Iterative DFS keeps the robot on the DFS tree: each frame remembers
        // the direction taken from its parent (to move back on pop).
        Deque<int[]> stack = new ArrayDeque<>(); // r, c, next direction index
        Deque<Integer> parentDirs = new ArrayDeque<>();
        stack.push(new int[] { 0, 0, 0 });
        parentDirs.push(-1);
        while (!stack.isEmpty()) {
            int[] frame = stack.peek();
            int r = frame[0],
                c = frame[1],
                idx = frame[2];
            boolean pushed = false;
            while (idx < DIRS.length) {
                char direction = DIRS[idx];
                int nr = r + DR[idx],
                    nc = c + DC[idx];
                idx += 1;
                if (master.canMove(direction) && !seen.containsKey(key(nr, nc))) {
                    master.move(direction);
                    seen.put(key(nr, nc), Boolean.TRUE);
                    if (master.isTarget()) {
                        targetKey = key(nr, nc);
                    }
                    frame[2] = idx;
                    stack.push(new int[] { nr, nc, 0 });
                    parentDirs.push(idx - 1);
                    pushed = true;
                    break;
                }
            }
            if (!pushed) {
                stack.pop();
                int parentDir = parentDirs.pop();
                if (!stack.isEmpty() && parentDir >= 0) {
                    master.move(BACK.charAt(parentDir));
                }
            }
        }

        if (targetKey == Long.MIN_VALUE) {
            return -1;
        }
        // Unit edge weights: plain BFS over the discovered map.
        Map<Long, Integer> dist = new HashMap<>();
        Deque<long[]> queue = new ArrayDeque<>();
        dist.put(startKey, 0);
        queue.add(new long[] { 0, 0 });
        while (!queue.isEmpty()) {
            long[] cell = queue.poll();
            int r = (int) cell[0],
                c = (int) cell[1];
            int d = dist.get(key(r, c));
            for (int i = 0; i < 4; i++) {
                int nr = r + DR[i],
                    nc = c + DC[i];
                if (seen.containsKey(key(nr, nc)) && !dist.containsKey(key(nr, nc))) {
                    dist.put(key(nr, nc), d + 1);
                    queue.add(new long[] { nr, nc });
                }
            }
        }
        return dist.get(targetKey);
    }

    private static long key(int r, int c) {
        return ((long) (r + OFFSET) << 16) | (c + OFFSET);
    }
}
