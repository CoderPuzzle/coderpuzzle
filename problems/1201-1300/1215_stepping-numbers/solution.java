import java.util.ArrayDeque;
import java.util.Arrays;

class Solution {

    public long[] countSteppingNumbers(long low, long high) {
        // Seed with every one-digit number, then extend by one digit: the
        // successor of a number ending in d is built from d-1 and d+1 only.
        // Stepping numbers under the 2 * 10^9 ceiling number under 4000, so
        // a fixed buffer sized to that bound holds every hit.
        long[] tmp = new long[4000];
        int count = 0;
        if (low <= 0 && 0 <= high) tmp[count++] = 0L;
        ArrayDeque<Long> queue = new ArrayDeque<>();
        for (long seed = 1; seed <= 9; ++seed) queue.add(seed);
        while (!queue.isEmpty()) {
            long current = queue.poll();
            if (current > high) continue;
            if (current >= low) tmp[count++] = current;
            long last = current % 10;
            long[] nexts = { last - 1, last + 1 };
            for (long digit : nexts) {
                if (digit >= 0 && digit <= 9) queue.add(current * 10 + digit);
            }
        }
        return Arrays.copyOf(tmp, count);
    }
}
