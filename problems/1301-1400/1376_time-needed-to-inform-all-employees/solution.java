class Solution {

    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        // arrival[i] = minutes until employee i starts spreading the news.
        long[] arrival = new long[n];
        java.util.Arrays.fill(arrival, -1L);
        arrival[headID] = 0;
        int best = 0;
        for (int employee = 0; employee < n; employee++) {
            if (arrival[employee] >= 0) {
                best = (int) Math.max(best, arrival[employee]);
                continue;
            }
            // Walk up the chain of unresolved managers, then unwind downward.
            int[] chain = new int[n];
            int depth = 0;
            int current = employee;
            while (arrival[current] < 0) {
                chain[depth++] = current;
                current = manager[current];
            }
            for (int k = depth - 1; k >= 0; k--) {
                int boss = manager[chain[k]];
                arrival[chain[k]] = arrival[boss] + informTime[boss];
            }
            best = (int) Math.max(best, arrival[employee]);
        }
        return best;
    }
}
