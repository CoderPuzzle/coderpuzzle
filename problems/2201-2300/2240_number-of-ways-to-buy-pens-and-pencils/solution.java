class Solution {

    public long waysToBuyPensPencils(int total, int cost1, int cost2) {
        long ways = 0;
        for (long pens = 0; pens <= total / cost1; pens++) {
            long remaining = total - pens * cost1;
            ways += remaining / cost2 + 1;
        }
        return ways;
    }
}
