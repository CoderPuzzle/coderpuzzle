import java.util.Comparator;
import java.util.PriorityQueue;

class Solution {

    public long minOperations(int[] nums, int k) {
        // Equalizing a window costs sum(|x - t|), minimized at a median t.
        // The window slides over two heap halves around the median; running
        // half-sums make each window's cost O(1). Every element packs to
        // the unique key (v + 2^20) << 17 | index so heap keys never tie,
        // which makes lazy deletion exact: the outgoing element routes to
        // its true half by one comparison against the low top, and stale
        // copies are dropped only when they surface at a heap top.
        int n = nums.length;
        PriorityQueue<Long> low = new PriorityQueue<>(Comparator.reverseOrder());
        PriorityQueue<Long> high = new PriorityQueue<>();
        int[] delayed = new int[n];
        int lowSize = 0,
            highSize = 0;
        long lowSum = 0,
            highSum = 0;
        long best = Long.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if (i >= k) {
                long outKey = (((long) nums[i - k] + 1048576) << 17) | (i - k);
                delayed[i - k] = 1;
                if (outKey <= low.peek()) {
                    lowSize--;
                    lowSum -= nums[i - k];
                } else {
                    highSize--;
                    highSum -= nums[i - k];
                }
            }
            long key = (((long) nums[i] + 1048576) << 17) | i;
            if ((lowSize == 0 && highSize == 0) || key <= low.peek()) {
                low.add(key);
                lowSize++;
                lowSum += nums[i];
            } else {
                high.add(key);
                highSize++;
                highSum += nums[i];
            }
            if (lowSize > highSize + 1) {
                prune(low, delayed);
                long move = low.poll();
                lowSize--;
                lowSum -= (move >> 17) - 1048576;
                high.add(move);
                highSize++;
                highSum += (move >> 17) - 1048576;
            } else if (lowSize < highSize) {
                prune(high, delayed);
                long move = high.poll();
                highSize--;
                highSum -= (move >> 17) - 1048576;
                low.add(move);
                lowSize++;
                lowSum += (move >> 17) - 1048576;
            }
            if (i >= k - 1) {
                prune(low, delayed);
                prune(high, delayed);
                long median = (low.peek() >> 17) - 1048576;
                long cost = median * lowSize - lowSum + (highSum - median * highSize);
                best = Math.min(best, cost);
            }
        }
        return best;
    }

    private void prune(PriorityQueue<Long> heap, int[] delayed) {
        // Drop stale copies whose departure is already booked but whose
        // physical entry has only now surfaced at the heap top.
        while (!heap.isEmpty() && delayed[(int) (heap.peek() & 131071)] != 0) {
            delayed[(int) (heap.peek() & 131071)] = 0;
            heap.poll();
        }
    }
}
