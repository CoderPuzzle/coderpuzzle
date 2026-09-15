class Solution {

    // Each customer's wait is settled the moment the previous order is
    // scheduled: the chef starts at max(freeAt, arrival), finishes at
    // start + time, and the wait is finish - arrival. The arrivals are
    // sorted, so one forward sweep carrying the chef's free time replays
    // the whole day. The waits total as exact integers — the deepest
    // legal queue sums to about 5 * 10^13, past 32 bits — so the total is
    // accumulated in a long and the single division at the end is the
    // only floating-point step.
    public double averageWaitingTime(int[][] customers) {
        long totalWaiting = 0;
        long freeAt = 0;
        for (int[] customer : customers) {
            long arrival = customer[0];
            long start = Math.max(freeAt, arrival);
            freeAt = start + customer[1];
            totalWaiting += freeAt - arrival;
        }
        return (double) totalWaiting / customers.length;
    }
}
