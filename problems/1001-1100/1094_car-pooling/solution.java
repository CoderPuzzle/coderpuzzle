class Solution {

    public boolean carPooling(int[][] trips, int capacity) {
        // difference array over the bounded locations: each trip is just
        // two events, +passengers at pickup and -passengers at dropoff
        int[] diff = new int[1001];
        for (int[] t : trips) {
            // dropoff lands at the exact end location, so during the sweep
            // it frees seats before any pickup at the same point
            diff[t[1]] += t[0];
            diff[t[2]] -= t[0];
        }
        // index order is the sweep: the running sum is the occupancy
        int used = 0;
        for (int delta : diff) {
            used += delta;
            if (used > capacity) {
                return false;
            }
        }
        return true;
    }
}
