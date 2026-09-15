class Solution {

    public int[] corpFlightBookings(int[][] bookings, int n) {
        // difference array (n + 1 slots keeps the stamp at index last in
        // bounds when last == n): each booking costs two writes instead of
        // touching every flight in [first, last]
        int[] diff = new int[n + 1];
        for (int[] b : bookings) {
            diff[b[0] - 1] += b[2];
            // -seats one slot past the range end, so flight `last` still
            // sees the seats and every later flight does not
            diff[b[1]] -= b[2];
        }
        // one prefix sum over the stamps: each +/- pair cancels exactly
        // beyond its range, so the running total is each flight's occupancy
        int[] answer = new int[n];
        int running = 0;
        for (int i = 0; i < n; i++) {
            running += diff[i];
            answer[i] = running;
        }
        return answer;
    }
}
