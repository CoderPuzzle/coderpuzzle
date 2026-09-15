class Solution {

    public int[] minCosts(int[] cost) {
        // Reaching position i costs no more than the cheapest swap among
        // people 0..i: swap into the cheapest position, then every later
        // position (being behind you) is free.
        int n = cost.length;
        int[] ans = new int[n];
        int best = cost[0];
        for (int i = 0; i < n; i++) {
            if (cost[i] < best) {
                best = cost[i];
            }
            ans[i] = best;
        }
        return ans;
    }
}
