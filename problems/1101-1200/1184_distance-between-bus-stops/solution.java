class Solution {

    public int distanceBetweenBusStops(int[] distance, int start, int destination) {
        // Order the stops: edge i leads from stop i to stop i+1, so the
        // clockwise arc between them uses exactly the entries in between.
        int lo = Math.min(start, destination);
        int hi = Math.max(start, destination);
        long total = 0;
        long clockwise = 0;
        for (int i = 0; i < distance.length; i++) {
            total += distance[i];
            if (i >= lo && i < hi) {
                clockwise += distance[i];
            }
        }
        long other = total - clockwise;
        return (int) Math.min(clockwise, other);
    }
}
