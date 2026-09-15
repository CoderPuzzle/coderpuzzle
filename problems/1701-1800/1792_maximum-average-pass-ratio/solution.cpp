class Solution {
  public:
    double maxAverageRatio(vector<vector<int>> &classes, int extraStudents) {
        int n = classes.size();
        vector<Item> heap;
        heap.reserve(n);
        for (auto &c : classes) {
            long long p = c[0];
            long long t = c[1];
            heap.push_back(Item(-gain(p, t), p, t));
        }
        // Average over a fixed class count, so maximize the ratio sum: one
        // more student in class (p, t) gains (p+1)/(t+1) - p/t, and that
        // marginal gain shrinks as the class grows — allocate each identical
        // student where it buys the most.
        heapify(heap);
        for (int k = 0; k < extraStudents; k++) {
            Item top = heappop(heap);
            long long p = top.p + 1;
            long long t = top.t + 1;
            // Re-push: after absorbing a student the class's gain drops and
            // another class may now offer the best marginal return.
            heappush(heap, Item(-gain(p, t), p, t));
        }
        // Python's sum() uses Neumaier compensated summation for floats; mirror it
        // so the final average is bit-identical to the reference.
        double f = (double)heap[0].p / (double)heap[0].t;
        double c = 0.0;
        for (size_t i = 1; i < heap.size(); i++) {
            double x = (double)heap[i].p / (double)heap[i].t;
            double t = f + x;
            if (fabs(f) >= fabs(x)) {
                c += (f - t) + x;
            } else {
                c += (x - t) + f;
            }
            f = t;
        }
        return (f + c) / heap.size();
    }

  private:
    // The heap below is a literal port of CPython's heapq so the array layout —
    // and therefore the final summation order — matches the Python reference exactly.
    struct Item {
        double g;
        long long p;
        long long t;
        Item(double g, long long p, long long t) : g(g), p(p), t(t) {}
    };

    static double gain(long long p, long long t) { return (double)(p + 1) / (double)(t + 1) - (double)p / (double)t; }

    static bool less(const Item &a, const Item &b) {
        if (a.g != b.g)
            return a.g < b.g;
        if (a.p != b.p)
            return a.p < b.p;
        return a.t < b.t;
    }

    static void siftUp(vector<Item> &heap, int pos) {
        int endpos = heap.size();
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

    static void siftDown(vector<Item> &heap, int startpos, int pos) {
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

    static void heapify(vector<Item> &heap) {
        int n = heap.size();
        for (int i = n / 2 - 1; i >= 0; i--) {
            siftUp(heap, i);
        }
    }

    static void heappush(vector<Item> &heap, Item item) {
        heap.push_back(item);
        siftDown(heap, 0, (int)heap.size() - 1);
    }

    static Item heappop(vector<Item> &heap) {
        Item lastelt = heap.back();
        heap.pop_back();
        if (!heap.empty()) {
            Item returnitem = heap[0];
            heap[0] = lastelt;
            siftUp(heap, 0);
            return returnitem;
        }
        return lastelt;
    }
};
