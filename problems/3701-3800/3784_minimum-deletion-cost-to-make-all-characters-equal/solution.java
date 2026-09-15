class Solution {

    public long minCost(String s, int[] cost) {
        long[] totals = new long[26];
        for (int i = 0; i < s.length(); i++) {
            totals[s.charAt(i) - 'a'] += cost[i];
        }
        long sum = 0;
        long best = 0;
        for (long t : totals) {
            sum += t;
            best = Math.max(best, t);
        }
        return sum - best;
    }
}
