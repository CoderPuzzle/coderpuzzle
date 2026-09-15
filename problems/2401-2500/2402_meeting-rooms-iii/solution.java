import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int mostBooked(int n, int[][] meetings) {
        List<int[]> ordered = new ArrayList<>();
        for (int i = 0; i < meetings.length; i++) {
            ordered.add(new int[] { meetings[i][0], meetings[i][1], i });
        }
        Collections.sort(ordered, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[2], b[2]));
        // endTime[i] = when room i frees up (-1: never used, always free).
        long[] endTime = new long[n];
        java.util.Arrays.fill(endTime, -1L);
        int[] count = new int[n];
        for (int[] m : ordered) {
            int s = m[0],
                e = m[1];
            // Lowest-numbered room already free by s wins the allocation.
            int room = -1;
            for (int i = 0; i < n; i++) {
                if (endTime[i] <= s) {
                    room = i;
                    break;
                }
            }
            if (room == -1) {
                // All busy: take the earliest-finishing room (strict <
                // keeps the lowest index on ties) and delay the meeting
                // there with its original duration.
                room = 0;
                for (int i = 1; i < n; i++) {
                    if (endTime[i] < endTime[room]) {
                        room = i;
                    }
                }
                endTime[room] += (long) (e - s);
            } else {
                endTime[room] = e;
            }
            count[room]++;
        }
        // Strict comparison keeps the lowest room index on count ties.
        int best = 0;
        for (int i = 1; i < n; i++) {
            if (count[i] > count[best]) best = i;
        }
        return best;
    }
}
