import java.util.ArrayList;
import java.util.List;

class MRUQueue {

    // The line rides a virtual tape: value v starts at tape position v and the
    // j-th fetch re-appends its element at position n + j, so tape order is
    // always line order. front marks the first live slot of the initial run —
    // a sorted hole list remembers the vacated ones — while a Fenwick tree
    // over the append stamps counts live elements per position, with a
    // stamp-to-value map beside it.
    private static final int stampBudget = 10000;

    private final int limit;
    private final int step;
    private final int[] tree = new int[stampBudget + 1];
    private final int[] vals = new int[stampBudget + 1];
    private final List<Integer> holes = new ArrayList<>();
    private int front = 1;
    private int fetches = 0;

    public MRUQueue(int n) {
        limit = n;
        step = Integer.highestOneBit(stampBudget);
    }

    public int fetch(int k) {
        int initLive = limit - front + 1 - holes.size();
        int value;
        if (k <= initLive) {
            int lo = front,
                hi = limit;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (mid - front + 1 - holesUpTo(mid) >= k) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            value = lo;
            holes.add(holesUpTo(value), value);
            while (!holes.isEmpty() && holes.get(0) == front) {
                holes.remove(0);
                front++;
            }
        } else {
            int remaining = k - initLive;
            int pos = 0;
            for (int hop = step; hop > 0; hop >>= 1) {
                int next = pos + hop;
                if (next <= stampBudget && tree[next] < remaining) {
                    pos = next;
                    remaining -= tree[next];
                }
            }
            int stamp = pos + 1;
            value = vals[stamp];
            add(stamp, -1);
        }
        fetches++;
        vals[fetches] = value;
        add(fetches, 1);
        return value;
    }

    private int holesUpTo(int bound) {
        int lo = 0,
            hi = holes.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (holes.get(mid) <= bound) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    private void add(int stamp, int delta) {
        for (; stamp <= stampBudget; stamp += stamp & -stamp) {
            tree[stamp] += delta;
        }
    }
}
