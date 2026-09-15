import java.util.PriorityQueue;

class Solution {

    public long minMoves(int[] balance) {
        int n = balance.length;
        long sum = 0;
        for (int x : balance) {
            sum += x;
        }
        if (sum < 0) {
            return -1;
        }
        if (n == 1) {
            return 0;
        }
        // total cost H(t) = |t| + internal line cost is convex in t; binary
        // search the integer minimizer
        long bound = total(balance, 0);
        long lo = -bound,
            hi = bound;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (total(balance, mid) <= total(balance, mid + 1)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return total(balance, lo);
    }

    private long total(int[] balance, long t) {
        return Math.abs(t) + lineCost(balance, t);
    }

    // Minimum flow cost on the path 0..n-2 with the wrap edge fixed at
    // signed flow t: sweep positions keeping the convex suffix-min envelope
    // of the DP as a constant plus rising-flank breakpoints.
    private long lineCost(int[] balance, long t) {
        int n = balance.length;
        long cost = 0;
        long delta = 0;
        PriorityQueue<Long> heap = new PriorityQueue<>();
        for (int k = 0; k < n - 1; k++) {
            delta += balance[k];
            long cap = delta;
            long z = -t;
            if (!heap.isEmpty()) {
                long low = heap.peek() + delta;
                if (z <= low) {
                    heap.add(z - delta);
                } else if (z <= cap) {
                    // valley below the current minimum: consume it and split
                    // the flank in two inside the support
                    cost += z - low;
                    heap.poll();
                    heap.add(z - delta);
                    heap.add(z - delta);
                } else {
                    // valley beyond the capped support: lowest breakpoint is
                    // absorbed into the constant
                    cost += z - low;
                    heap.poll();
                }
            } else if (z <= cap) {
                heap.add(z - delta);
            } else {
                cost += z - cap;
            }
        }
        long limit = -((long) balance[n - 1]);
        while (!heap.isEmpty() && heap.peek() + delta < limit) {
            cost += limit - (heap.poll() + delta);
        }
        return cost;
    }
}
