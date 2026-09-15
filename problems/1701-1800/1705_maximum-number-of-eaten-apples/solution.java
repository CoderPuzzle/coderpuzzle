import java.util.PriorityQueue;

class Solution {

    public int eatenApples(int[] apples, int[] days) {
        int n = apples.length;
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1])
        );
        int eaten = 0;
        // Greedy: always eat from the soonest-rotting batch. Exchange argument
        // — swapping a later-rotting apple for an earlier-rotting one never
        // reduces the total — so a min-heap keyed by rot day is optimal.
        for (int i = 0; i < n; i++) {
            if (apples[i] > 0) {
                heap.add(new int[] { i + days[i], apples[i] });
            }
            // Purge batches whose rot day has arrived (inedible from day
            // i + days[i] on).
            while (!heap.isEmpty() && heap.peek()[0] <= i) {
                heap.poll();
            }
            // Eat from the front batch; push it back minus one if any remain.
            if (!heap.isEmpty()) {
                int[] item = heap.poll();
                eaten++;
                if (item[1] > 1) {
                    heap.add(new int[] { item[0], item[1] - 1 });
                }
            }
        }
        // After day n no new apples appear: keep purging and eating one apple
        // per day until every batch has rotted or been eaten.
        int day = n;
        while (!heap.isEmpty()) {
            while (!heap.isEmpty() && heap.peek()[0] <= day) {
                heap.poll();
            }
            if (heap.isEmpty()) {
                break;
            }
            int[] item = heap.poll();
            eaten++;
            if (item[1] > 1) {
                heap.add(new int[] { item[0], item[1] - 1 });
            }
            day++;
        }
        return eaten;
    }
}
