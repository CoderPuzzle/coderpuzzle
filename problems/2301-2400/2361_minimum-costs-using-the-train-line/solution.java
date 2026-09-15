import java.util.Arrays;

class Solution {

    public long[] minimumCosts(int[] regular, int[] express, int expressCost) {
        // Track the cheapest cost to reach the previous stop on each route;
        // at stop 0 only the regular seat exists, so exp starts unreachable
        // (a huge sentinel). Dropping express -> regular is free; boarding
        // regular -> express costs expressCost every time. Totals reach
        // ~2e10, so every cost is carried in long, never in int.
        final long INF = 1L << 60;
        long reg = 0,
            exp = INF;
        long[] costs = new long[regular.length];
        for (int i = 0; i < regular.length; i++) {
            long newReg = Math.min(reg, exp) + regular[i];
            long newExp = Math.min(reg + expressCost, exp) + express[i];
            reg = newReg;
            exp = newExp;
            costs[i] = Math.min(reg, exp);
        }
        return costs;
    }
}
