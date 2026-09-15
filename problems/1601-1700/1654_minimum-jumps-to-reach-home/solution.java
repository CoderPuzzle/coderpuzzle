import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    // Treat the line as a graph whose nodes are (position, back) pairs, back
    // marking that the previous jump went backward — the state that forbids
    // a second consecutive backward jump. Breadth-first search by jump count
    // reaches home in the fewest jumps; the line only needs to be explored
    // up to max(x, max(forbidden)) + a + b, because above that line there is
    // nothing to land on that matters, and each backward jump must be paid
    // for by a following forward jump, so a useful overshoot tops out one
    // forward step plus one backward reach higher.
    public int minimumJumps(int[] forbidden, int a, int b, int x) {
        int highest = x;
        for (int position : forbidden) {
            highest = Math.max(highest, position);
        }
        int limit = highest + a + b;
        boolean[] blocked = new boolean[limit + 1];
        for (int position : forbidden) {
            blocked[position] = true;
        }
        // seen[position][back] — back == 1 means the previous jump was backward
        boolean[][] seen = new boolean[limit + 1][2];
        seen[0][0] = true;
        Queue<int[]> frontier = new ArrayDeque<>();
        frontier.add(new int[] { 0, 0 });
        int jumps = 0;
        while (!frontier.isEmpty()) {
            for (int size = frontier.size(); size > 0; --size) {
                int[] state = frontier.poll();
                int position = state[0];
                int back = state[1];
                if (position == x) {
                    return jumps;
                }
                int forward = position + a;
                if (forward <= limit && !blocked[forward] && !seen[forward][0]) {
                    seen[forward][0] = true;
                    frontier.add(new int[] { forward, 0 });
                }
                if (back == 0) {
                    int backward = position - b;
                    if (backward >= 0 && !blocked[backward] && !seen[backward][1]) {
                        seen[backward][1] = true;
                        frontier.add(new int[] { backward, 1 });
                    }
                }
            }
            ++jumps;
        }
        return -1;
    }
}
