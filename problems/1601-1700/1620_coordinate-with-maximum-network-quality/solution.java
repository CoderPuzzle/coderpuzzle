class Solution {

    public int[] bestCoordinate(int[][] towers, int radius) {
        int bestX = 0,
            bestY = 0;
        long bestQuality = -1;

        for (int x = 0; x <= 50; x++) {
            for (int y = 0; y <= 50; y++) {
                long total = 0;
                for (int[] tower : towers) {
                    double dx = tower[0] - x;
                    double dy = tower[1] - y;
                    double d = Math.sqrt(dx * dx + dy * dy);
                    if (d <= radius) {
                        total += (long) Math.floor(tower[2] / (1 + d));
                    }
                }
                if (total > bestQuality) {
                    bestQuality = total;
                    bestX = x;
                    bestY = y;
                }
            }
        }

        return new int[] { bestX, bestY };
    }
}
