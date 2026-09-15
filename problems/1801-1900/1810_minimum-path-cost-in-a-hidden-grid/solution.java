import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    private static final char[] DIRS = { 'U', 'D', 'L', 'R' };
    private static final int[] DR = { -1, 1, 0, 0 };
    private static final int[] DC = { 0, 0, -1, 1 };
    private static final String BACK = "DURL";

    public int findMinimumPath(GridMaster master) {
        Map<Long, Integer> cost = new HashMap<>();
        Map<Long, Integer> dist = new HashMap<>();
        long startKey = key(0, 0);
        cost.put(startKey, 0);
        int[] foundTarget = master.isTarget() ? new int[] { 0, 0 } : null;

        // Iterative DFS keeps the robot on the DFS tree: each frame remembers
        // the direction taken from its parent (to move back on pop).
        Deque<int[]> stack = new ArrayDeque<>(); // r, c, parentDir index, nextDir index
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
                if (master.canMove(direction) && !cost.containsKey(key(nr, nc))) {
                    cost.put(key(nr, nc), master.move(direction));
                    if (master.isTarget()) {
                        foundTarget = new int[] { nr, nc };
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

        if (foundTarget == null) {
            return -1;
        }
        Map<Long, Integer> d = new HashMap<>();
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        d.put(startKey, 0);
        heap.add(new long[] { 0, 0, 0 });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            int du = (int) top[0],
                r = (int) top[1],
                c = (int) top[2];
            if (du > d.getOrDefault(key(r, c), Integer.MAX_VALUE)) {
                continue;
            }
            for (int i = 0; i < 4; i++) {
                int nr = r + DR[i],
                    nc = c + DC[i];
                Integer step = cost.get(key(nr, nc));
                if (step != null) {
                    int nd = du + step;
                    if (nd < d.getOrDefault(key(nr, nc), Integer.MAX_VALUE)) {
                        d.put(key(nr, nc), nd);
                        heap.add(new long[] { nd, nr, nc });
                    }
                }
            }
        }
        Integer answer = d.get(key(foundTarget[0], foundTarget[1]));
        return answer == null ? -1 : answer;
    }

    private static long key(int r, int c) {
        return ((long) (r + 200) << 16) | (c + 200);
    }
}
