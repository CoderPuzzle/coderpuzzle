class MinStack {

    // Stack of (value, minimum-so-far) pairs — each entry is self-contained.
    private int[] values = new int[64];
    private int[] minimums = new int[64];
    private int size = 0;

    public MinStack() {}

    private void ensureCapacity() {
        if (size == values.length) {
            int grown = values.length * 2;
            int[] newValues = new int[grown];
            int[] newMinimums = new int[grown];
            System.arraycopy(values, 0, newValues, 0, size);
            System.arraycopy(minimums, 0, newMinimums, 0, size);
            values = newValues;
            minimums = newMinimums;
        }
    }

    public void push(int value) {
        ensureCapacity();
        values[size] = value;
        // Snapshot the minimum of the stack as of this push: the new value
        // combined with the minimum of the entry below.
        minimums[size] = size == 0 ? value : Math.min(value, minimums[size - 1]);
        size++;
    }

    public void pop() {
        // A pop restores an earlier stack state whose exposed entry already
        // holds that state's minimum — no recomputation needed.
        size--;
    }

    public int top() {
        return values[size - 1];
    }

    public int getMin() {
        // The top pair alone answers both queries in O(1).
        return minimums[size - 1];
    }
}
