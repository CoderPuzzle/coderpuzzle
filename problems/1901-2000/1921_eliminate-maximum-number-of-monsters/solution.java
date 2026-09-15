import java.util.Arrays;

class Solution {

    public int eliminateMaximum(int[] dist, int[] speed) {
        // Monster i reaches the city at minute ceil(dist[i]/speed[i]) — at
        // that exact minute it already counts as a loss. The i-th shot
        // happens at minute i, so after sorting arrival minutes the answer
        // is the first position where the arrival is not strictly later
        // than the shot.
        int n = dist.length;
        int[] arrivals = new int[n];
        for (int i = 0; i < n; ++i) {
            arrivals[i] = (dist[i] + speed[i] - 1) / speed[i];
        }
        Arrays.sort(arrivals);
        for (int i = 0; i < n; ++i) {
            if (arrivals[i] <= i) return i;
        }
        return n;
    }
}
