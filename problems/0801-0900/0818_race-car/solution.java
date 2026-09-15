import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public int racecar(int target) {
        int bound = 2 * target;
        long span = 4L * bound + 1;
        Deque<long[]> queue = new ArrayDeque<>();
        Set<Long> visited = new HashSet<>();
        queue.add(new long[] { 0, 1 });
        visited.add(encode(0, 1, bound, span));
        int steps = 0;
        while (!queue.isEmpty()) {
            for (int sz = queue.size(); sz > 0; sz--) {
                long[] cur = queue.poll();
                long pos = cur[0],
                    speed = cur[1];
                if (pos == target) return steps;
                // Accelerate.
                long np = pos + speed,
                    ns = speed * 2;
                if (-bound <= np && np <= bound && visited.add(encode(np, ns, bound, span))) {
                    queue.add(new long[] { np, ns });
                }
                // Reverse.
                long rs = speed > 0 ? -1 : 1;
                if (visited.add(encode(pos, rs, bound, span))) {
                    queue.add(new long[] { pos, rs });
                }
            }
            steps += 1;
        }
        return -1;
    }

    // Encode (pos, speed) as an integer key: speed lives in [-2*bound, 2*bound].
    private long encode(long pos, long speed, long bound, long span) {
        return (pos + bound) * span + (speed + 2 * bound);
    }
}
