import java.util.ArrayDeque;
import java.util.Comparator;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

// Every statistic lives in its own incrementally maintained structure: a
// queue holds arrival order, a running sum serves the mean, two heaps
// split the live values into a lower and an upper half so the median is
// always at a top, and a (count, value) heap answers the mode. Removals
// are FIFO and arbitrary for a heap, so an erased value is only marked in
// a delayed counter and discarded when it surfaces at a top; rebalancing
// counts only live entries, and the mode heap's stale entries are skipped
// lazily the same way. Each call costs O(log n) amortized. The running
// sum reaches 1e5 * 1e9 = 1e14, so it is held in a long.
class StatisticsTracker {

    private final Deque<Integer> queue = new ArrayDeque<>();
    private long total = 0;
    // small is a raw max-heap over the lower half; large is a min-heap.
    private final PriorityQueue<Integer> small = new PriorityQueue<>(Comparator.reverseOrder());
    private final PriorityQueue<Integer> large = new PriorityQueue<>();
    private int smallSize = 0; // live sizes, ghosts excluded
    private int largeSize = 0;
    private final Map<Integer, Integer> delayed = new HashMap<>();
    private final Map<Integer, Integer> counts = new HashMap<>();
    // Entries (-count, value): the natural pair order puts the highest
    // count first and breaks ties toward the smallest value.
    private final PriorityQueue<int[]> modeHeap = new PriorityQueue<>((a, b) ->
        a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1])
    );

    // Discard ghosts queued for deletion while they sit at the top.
    private void pruneSmall() {
        while (!small.isEmpty()) {
            int value = small.peek();
            int pending = delayed.getOrDefault(value, 0);
            if (pending > 0) {
                delayed.put(value, pending - 1);
                small.poll();
            } else {
                break;
            }
        }
    }

    private void pruneLarge() {
        while (!large.isEmpty()) {
            int value = large.peek();
            int pending = delayed.getOrDefault(value, 0);
            if (pending > 0) {
                delayed.put(value, pending - 1);
                large.poll();
            } else {
                break;
            }
        }
    }

    // Keep ceil(n/2) live values in small; the median read sits at a top
    // after this. Moves only touch pruned, live tops.
    private void rebalance() {
        if (smallSize > largeSize + 1) {
            large.offer(small.poll());
            smallSize--;
            largeSize++;
            pruneSmall();
        } else if (smallSize < largeSize) {
            small.offer(large.poll());
            smallSize++;
            largeSize--;
            pruneLarge();
        }
    }

    public void addNumber(int number) {
        queue.addLast(number);
        total += number;
        counts.merge(number, 1, Integer::sum);
        // An entry exists for every count level each value reaches, so
        // the current count of any live value is always in the heap.
        modeHeap.offer(new int[] { -counts.get(number), number });
        if (small.isEmpty() || number <= small.peek()) {
            small.offer(number);
            ++smallSize;
        } else {
            large.offer(number);
            ++largeSize;
        }
        rebalance();
    }

    public void removeFirstAddedNumber() {
        int number = queue.pollFirst();
        total -= number;
        counts.merge(number, -1, Integer::sum);
        // The ghost is charged to the half its value belongs to; when a
        // matching copy surfaces at that top it is discarded, which keeps
        // fungible duplicates consistent.
        delayed.merge(number, 1, Integer::sum);
        if (number <= small.peek()) {
            --smallSize;
            if (number == small.peek()) pruneSmall();
        } else {
            --largeSize;
            if (number == large.peek()) pruneLarge();
        }
        rebalance();
    }

    public int getMean() {
        return (int) (total / queue.size());
    }

    public int getMedian() {
        pruneSmall();
        pruneLarge();
        if (smallSize > largeSize) return small.peek();
        // Even count: the larger of the two middles is the upper half's
        // minimum.
        return large.peek();
    }

    public int getMode() {
        while (!modeHeap.isEmpty()) {
            int[] top = modeHeap.peek();
            if (counts.get(top[1]) == -top[0]) return top[1];
            modeHeap.poll();
        }
        throw new IllegalStateException("empty tracker");
    }
}
