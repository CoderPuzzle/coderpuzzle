class Solution {

    public double maxAverageRatio(int[][] classes, int extraStudents) {
        int n = classes.length;
        Item[] heap = new Item[n];
        for (int i = 0; i < n; i++) {
            long p = classes[i][0];
            long t = classes[i][1];
            heap[i] = new Item(-gain(p, t), p, t);
        }
        // Average over a fixed class count, so maximize the ratio sum: one
        // more student in class (p, t) gains (p+1)/(t+1) - p/t, and that
        // marginal gain shrinks as the class grows — allocate each identical
        // student where it buys the most.
        heapify(heap, n);
        int size = n;
        for (int k = 0; k < extraStudents; k++) {
            Item top = heappop(heap, size);
            size--;
            long p = top.p + 1;
            long t = top.t + 1;
            // Re-push: after absorbing a student the class's gain drops and
            // another class may now offer the best marginal return.
            heappush(heap, size, new Item(-gain(p, t), p, t));
            size++;
        }
        // Python's sum() uses Neumaier compensated summation for floats; mirror it
        // so the final average is bit-identical to the reference.
        double f = (double) heap[0].p / (double) heap[0].t;
        double c = 0.0;
        for (int i = 1; i < size; i++) {
            double x = (double) heap[i].p / (double) heap[i].t;
            double t = f + x;
            if (Math.abs(f) >= Math.abs(x)) {
                c += f - t + x;
            } else {
                c += x - t + f;
            }
            f = t;
        }
        return (f + c) / size;
    }

    // The heap below is a literal port of CPython's heapq so the array layout —
    // and therefore the final summation order — matches the Python reference exactly.
    private static double gain(long p, long t) {
        return (double) (p + 1) / (double) (t + 1) - (double) p / (double) t;
    }

    private static boolean less(Item a, Item b) {
        if (a.g != b.g) return a.g < b.g;
        if (a.p != b.p) return a.p < b.p;
        return a.t < b.t;
    }

    private static void siftUp(Item[] heap, int size, int pos) {
        int endpos = size;
        int startpos = pos;
        Item newitem = heap[pos];
        int childpos = 2 * pos + 1;
        while (childpos < endpos) {
            int rightpos = childpos + 1;
            if (rightpos < endpos && !less(heap[childpos], heap[rightpos])) {
                childpos = rightpos;
            }
            heap[pos] = heap[childpos];
            pos = childpos;
            childpos = 2 * pos + 1;
        }
        heap[pos] = newitem;
        siftDown(heap, startpos, pos);
    }

    private static void siftDown(Item[] heap, int startpos, int pos) {
        Item newitem = heap[pos];
        while (pos > startpos) {
            int parentpos = (pos - 1) >> 1;
            Item parent = heap[parentpos];
            if (less(newitem, parent)) {
                heap[pos] = parent;
                pos = parentpos;
                continue;
            }
            break;
        }
        heap[pos] = newitem;
    }

    private static void heapify(Item[] heap, int size) {
        for (int i = size / 2 - 1; i >= 0; i--) {
            siftUp(heap, size, i);
        }
    }

    private static void heappush(Item[] heap, int size, Item item) {
        heap[size] = item;
        siftDown(heap, 0, size);
    }

    private static Item heappop(Item[] heap, int size) {
        Item lastelt = heap[size - 1];
        if (size - 1 > 0) {
            Item returnitem = heap[0];
            heap[0] = lastelt;
            siftUp(heap, size - 1, 0);
            return returnitem;
        }
        return lastelt;
    }

    private static final class Item {

        final double g;
        final long p;
        final long t;

        Item(double g, long p, long t) {
            this.g = g;
            this.p = p;
            this.t = t;
        }
    }
}
