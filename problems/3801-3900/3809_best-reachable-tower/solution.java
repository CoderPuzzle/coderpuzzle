class Solution {

    public int[] bestTower(int[][] towers, int[] center, int radius) {
        int cx = center[0],
            cy = center[1];
        int[] best = null;
        int bestQuality = -1;
        for (int[] tower : towers) {
            int x = tower[0],
                y = tower[1],
                quality = tower[2];
            if (Math.abs(x - cx) + Math.abs(y - cy) > radius) {
                continue;
            }
            // Strictly better quality wins; on a quality tie the
            // lexicographically smaller coordinate wins.
            if (
                best == null ||
                quality > bestQuality ||
                (quality == bestQuality && (x < best[0] || (x == best[0] && y < best[1])))
            ) {
                best = new int[] { x, y };
                bestQuality = quality;
            }
        }
        return best != null ? best : new int[] { -1, -1 };
    }
}
