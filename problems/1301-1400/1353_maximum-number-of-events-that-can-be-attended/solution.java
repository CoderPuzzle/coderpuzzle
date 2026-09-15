import java.util.Arrays;
import java.util.PriorityQueue;

class Solution {

    public int maxEvents(int[][] events) {
        // Day sweep over events sorted by start day; a min-heap of end days
        // holds the events available today.
        Arrays.sort(events, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        int n = events.length;
        int i = 0;
        int day = 1;
        int attended = 0;
        PriorityQueue<Integer> openEnds = new PriorityQueue<>();
        while (i < n || !openEnds.isEmpty()) {
            // Heap empty: skip idle days by jumping the clock straight to
            // the next event's start day.
            if (openEnds.isEmpty()) {
                day = Math.max(day, events[i][0]);
            }
            // Every event that has started becomes available today.
            while (i < n && events[i][0] <= day) {
                openEnds.add(events[i][1]);
                i++;
            }
            // Discard events whose end day already passed — lost regardless.
            while (!openEnds.isEmpty() && openEnds.peek() < day) {
                openEnds.poll();
            }
            // Attend the soonest-ending (most perishable) event; an exchange
            // argument shows swapping it in never breaks feasibility.
            if (!openEnds.isEmpty()) {
                openEnds.poll();
                attended++;
            }
            day++;
        }
        return attended;
    }
}
