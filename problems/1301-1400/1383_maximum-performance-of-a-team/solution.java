import java.util.PriorityQueue;

class Solution {

    public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {
        final long MOD = 1000000007L;
        int[][] engineers = new int[n][2];
        for (int i = 0; i < n; i++) {
            engineers[i][0] = efficiency[i];
            engineers[i][1] = speed[i];
        }
        // Decouple sum(speeds) * min(efficiency) by fixing the minimum:
        // sweep in decreasing efficiency so the current engineer caps the
        // team, and everyone seen so far has efficiency >= theirs.
        java.util.Arrays.sort(engineers, (a, b) -> {
            if (b[0] != a[0]) {
                return b[0] - a[0];
            }
            return b[1] - a[1];
        });
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        long speedSum = 0;
        long best = 0;
        for (int[] e : engineers) {
            pq.add(e[1]);
            speedSum += e[1];
            // Evict the slowest when over budget, leaving the k fastest
            // among engineers with efficiency >= the current one.
            if (pq.size() > k) {
                speedSum -= pq.poll();
            }
            // Best performance of any team this engineer caps; the optimal
            // team's bottleneck appears as "current" at some step.
            long perf = speedSum * e[0];
            if (perf > best) {
                best = perf;
            }
        }
        // Reduce only at the end: the max must be taken on true values.
        return (int) (best % MOD);
    }
}
