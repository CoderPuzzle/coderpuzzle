import java.util.ArrayDeque;
import java.util.Deque;

// Two Fenwick trees indexed by value — one of counts, one of sums — hold
// the current m-wide window, alongside the window itself in arrival
// order. addElement inserts the new value and, once the window is full,
// removes the value that just slid out; both are O(log V). A query
// descends the count tree twice to read off the combined value of the j
// smallest elements for j = k and j = m - k, so the trimmed middle sum
// is S(m-k) - S(k) and the answer is that sum floor-divided by m - 2k,
// or -1 while the stream is still shorter than m.
class MKAverage {

    private static final int LIMIT = 100000;

    private final int m;
    private final int k;
    private final int[] counts = new int[LIMIT + 1];
    private final long[] sums = new long[LIMIT + 1];
    private final Deque<Integer> window = new ArrayDeque<>();
    private int size = 0;

    public MKAverage(int m, int k) {
        this.m = m;
        this.k = k;
    }

    private void update(int value, int delta) {
        // Counts and sums move together so a descent can pair them; the sum
        // side always charges the element's own value, not the bucket index.
        for (int element = value; value <= LIMIT; value += value & -value) {
            counts[value] += delta;
            sums[value] += (long) element * delta;
        }
    }

    public void addElement(int num) {
        window.addLast(num);
        update(num, 1);
        ++size;
        if (size > m) {
            // The window holds exactly the last m elements: evict the oldest.
            int old = window.pollFirst();
            update(old, -1);
            --size;
        }
    }

    private long smallestSum(int j) {
        // Descend the count tree to the value holding the j-th smallest
        // element, accumulating the sums of fully covered buckets.
        int index = 0,
            taken = 0;
        long total = 0;
        for (int step = 1 << 16; step > 0; step >>= 1) {
            int next = index + step;
            if (next <= LIMIT && taken + counts[next] < j) {
                index = next;
                taken += counts[next];
                total += sums[next];
            }
        }
        return total + (long) (index + 1) * (j - taken);
    }

    public int calculateMKAverage() {
        if (size < m) return -1;
        long middle = smallestSum(m - k) - smallestSum(k);
        return (int) (middle / (m - 2L * k));
    }
}
