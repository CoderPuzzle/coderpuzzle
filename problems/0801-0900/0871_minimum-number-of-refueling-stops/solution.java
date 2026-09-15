import java.util.*;

class Solution {

    public int minRefuelStops(int target, int startFuel, int[][] stations) {
        long fuel = startFuel;
        PriorityQueue<Integer> available = new PriorityQueue<>(Collections.reverseOrder());
        int stops = 0;
        int i = 0;
        int n = stations.length;
        while (true) {
            if (fuel >= target) {
                return stops;
            }
            while (i < n && stations[i][0] <= fuel) {
                available.offer(stations[i][1]);
                i++;
            }
            if (available.isEmpty()) {
                return -1;
            }
            fuel += available.poll();
            stops++;
        }
    }
}
