class CustomStack {

    private final int[] values;
    // pending[i]: increment owed by every element at depth <= i,
    // applied lazily when that element is popped
    private final int[] pending;
    private int size;

    public CustomStack(int maxSize) {
        this.values = new int[maxSize];
        this.pending = new int[maxSize];
        this.size = 0;
    }

    public void push(int x) {
        if (size < values.length) {
            values[size] = x;
            pending[size] = 0;
            size++;
        }
    }

    public int pop() {
        if (size == 0) {
            return -1;
        }
        size--;
        int increment = pending[size];
        // increments always target a prefix, so the popped element absorbed
        // everything its depth owes — pass that down to the new deepest slot
        if (size > 0) {
            pending[size - 1] += increment;
        }
        return values[size] + increment;
    }

    public void increment(int k, int val) {
        // one write at the deepest slot the increment reaches; no O(k) walk
        int limit = Math.min(k, size);
        if (limit > 0) {
            pending[limit - 1] += val;
        }
    }
}
