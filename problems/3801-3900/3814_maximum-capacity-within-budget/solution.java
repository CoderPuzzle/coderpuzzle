import java.util.Arrays;

class Solution {

    public int maxCapacity(int[] costs, int[] capacity, int budget) {
        // Costs and capacities are at most 1e5 and budget at most 2e5, so
        // every cost sum stays below budget and every capacity sum is at
        // most 2e5 — int carries them all. Each machine fits one long
        // (cost above bit 17, capacity below), so one sort orders by cost
        // with capacities aligned; every affordable pair is then reachable
        // from its dearer machine with a prefix of cheaper partners, and a
        // prefix maximum of capacities answers "best partner" in constant
        // time per machine.
        int n = costs.length;
        long[] machines = new long[n];
        for (int i = 0; i < n; i++) machines[i] = ((long) costs[i] << 17) | capacity[i];
        Arrays.sort(machines);
        int[] sortedCosts = new int[n];
        int[] caps = new int[n];
        int[] prefMax = new int[n];
        int run = 0;
        for (int i = 0; i < n; i++) {
            sortedCosts[i] = (int) (machines[i] >> 17);
            caps[i] = (int) (machines[i] & 0x1FFFF);
            run = Math.max(run, caps[i]);
            prefMax[i] = run;
        }
        // The empty selection costs 0 < budget (budget >= 1), so 0 is
        // always achievable and the answer only improves from there.
        // Partners are read only from indices before i, so a machine can
        // never pair with itself while every pair is still counted from
        // its dearer end.
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int cost = sortedCosts[i];
            int cap = caps[i];
            if (cost < budget) ans = Math.max(ans, cap);
            // Largest j with sortedCosts[j] < budget - cost.
            int lo = 0;
            int hi = n;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (sortedCosts[mid] < budget - cost) lo = mid + 1;
                else hi = mid;
            }
            int t = Math.min(lo - 1, i - 1);
            if (t >= 0) ans = Math.max(ans, cap + prefMax[t]);
        }
        return ans;
    }
}
