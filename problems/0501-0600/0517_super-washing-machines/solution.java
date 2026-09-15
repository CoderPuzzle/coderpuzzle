class Solution {

    public int findMinMoves(int[] machines) {
        // A move passes dresses around but creates none, so equalizing first
        // requires total % n == 0. Afterwards the answer is the largest of
        // two one-per-move bottlenecks: the net dresses forced across any
        // one boundary, and any single machine's excess — a machine gives
        // away one dress per move even when both neighbors are short.
        long total = 0;
        for (int dresses : machines) {
            total += dresses;
        }
        int count = machines.length;
        if (total % count != 0) {
            return -1;
        }
        long average = total / count;
        // The total reaches n * 10^5 = 10^9, technically inside int range
        // but with no headroom; the sweep runs in long and only the answer
        // (at most 2.5 * 10^8) comes back down.
        long moves = 0;
        long crossing = 0;
        for (int dresses : machines) {
            // `crossing` is the traffic the boundary on this machine's right
            // must carry: the left block's surplus, forced in any schedule.
            crossing += dresses - average;
            moves = Math.max(moves, Math.max(Math.abs(crossing), dresses - average));
        }
        return (int) moves;
    }
}
