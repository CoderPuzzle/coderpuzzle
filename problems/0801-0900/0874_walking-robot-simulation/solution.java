import java.util.HashSet;
import java.util.Set;

class Solution {

    public int robotSim(int[] commands, int[][] obstacles) {
        // Replay the walk exactly as stated: the heading is an index on the
        // four cardinal directions, a turn is one step around that cycle
        // (right +1, left +3, mod 4), and a forward command is unit moves
        // that halt the whole command the moment the next cell is blocked.
        // Obstacles live in a set for constant-time membership, and the
        // answer is the largest x*x + y*y over the whole path in time, not
        // just at the final cell.
        Set<Long> blocked = new HashSet<>();
        for (int[] obstacle : obstacles) {
            // One integer key per cell; 200003 exceeds twice the furthest
            // reachable coordinate (9 * 10^4), so distinct cells never collide.
            blocked.add(obstacle[0] * 200003L + obstacle[1]);
        }
        int[] dx = { 0, 1, 0, -1 }; // north, east, south, west
        int[] dy = { 1, 0, -1, 0 };
        int x = 0;
        int y = 0;
        int heading = 0;
        long best = 0;
        for (int command : commands) {
            if (command == -2) {
                // turn left
                heading = (heading + 3) & 3;
            } else if (command == -1) {
                // turn right
                heading = (heading + 1) & 3;
            } else {
                for (int step = 0; step < command; ++step) {
                    int nx = x + dx[heading];
                    int ny = y + dy[heading];
                    if (blocked.contains(nx * 200003L + ny)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    long here = (long) x * x + (long) y * y;
                    if (here > best) {
                        best = here;
                    }
                }
            }
        }
        return (int) best;
    }
}
