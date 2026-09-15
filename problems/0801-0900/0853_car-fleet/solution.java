import java.util.Arrays;

class Solution {

    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        // Cars cannot pass each other, so sweep from the car nearest
        // the target backward.
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) {
            idx[i] = i;
        }
        Arrays.sort(idx, (a, b) -> {
            int cmp = Integer.compare(position[b], position[a]);
            if (cmp != 0) {
                return cmp;
            }
            return Integer.compare(speed[b], speed[a]);
        });
        int fleets = 0;
        double lastTime = 0.0;
        for (int i : idx) {
            // A car's fate is its alone-time to the target.
            double time = (double) (target - position[i]) / speed[i];
            // Strictly later never catches the fleet ahead: a new
            // fleet lead. Otherwise it merges (equality at the target
            // merges), and lastTime — the current fleet's arrival
            // time — stays put.
            if (time > lastTime) {
                fleets++;
                lastTime = time;
            }
        }
        return fleets;
    }
}
