import java.util.PriorityQueue;

class Solution {

    public int getNumberOfBacklogOrders(int[][] orders) {
        // Two heaps: sells as a min-heap on price, buys as a max-heap. An
        // incoming batch trades with the best-priced opposing batch while
        // the price condition holds; only its unmatched remainder joins
        // the backlog as one new batch.
        PriorityQueue<int[]> sells = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        PriorityQueue<int[]> buys = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));
        for (int[] order : orders) {
            int price = order[0],
                amount = order[1];
            if (order[2] == 0) {
                while (amount > 0 && !sells.isEmpty() && sells.peek()[0] <= price) {
                    int take = Math.min(amount, sells.peek()[1]);
                    amount -= take;
                    sells.peek()[1] -= take;
                    if (sells.peek()[1] == 0) sells.poll();
                }
                if (amount > 0) buys.offer(new int[] { price, amount });
            } else {
                while (amount > 0 && !buys.isEmpty() && buys.peek()[0] >= price) {
                    int take = Math.min(amount, buys.peek()[1]);
                    amount -= take;
                    buys.peek()[1] -= take;
                    if (buys.peek()[1] == 0) buys.poll();
                }
                if (amount > 0) sells.offer(new int[] { price, amount });
            }
        }
        // Totals reach 1e5 * 1e9 = 1e14, so the sum is accumulated in
        // 64-bit integers and reduced modulo 1e9 + 7 at the end.
        long total = 0;
        for (int[] o : sells) total += o[1];
        for (int[] o : buys) total += o[1];
        return (int) (total % 1_000_000_007L);
    }
}
