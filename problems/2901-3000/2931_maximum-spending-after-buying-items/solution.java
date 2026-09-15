import java.util.PriorityQueue;

class Solution {

    public long maxSpending(int[][] values) {
        // Each row is non-increasing, so a shop's cheapest unbought item
        // always sits at the moving tail. Buying the globally cheapest
        // tail on each (cheapest-first) day pairs every value with the
        // smallest day it can still take, which an exchange argument
        // shows is optimal: swapping any two days' purchases never pays.
        PriorityQueue<long[]> tails = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        for (int shop = 0; shop < values.length; shop++) {
            int last = values[shop].length - 1;
            tails.offer(new long[] { values[shop][last], shop, last });
        }
        long total = 0;
        long days = (long) values.length * values[0].length;
        for (long day = 1; day <= days; day++) {
            long[] tail = tails.poll();
            total += tail[0] * day;
            if (tail[2] > 0) {
                tails.offer(new long[] { values[(int) tail[1]][(int) tail[2] - 1], tail[1], tail[2] - 1 });
            }
        }
        return total;
    }
}
