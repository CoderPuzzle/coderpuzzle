class MovingAverage {

    // A fixed ring buffer plus a running sum: next() writes the incoming
    // value over the window's oldest slot, folds the evicted value out of
    // the sum and the new one in, and returns sum / count — the sum stays
    // an exact long and only the final step is a division.
    private final long[] window;
    private long total = 0;
    private int head = 0;
    private int count = 0;

    public MovingAverage(int size) {
        window = new long[size];
    }

    public double next(int val) {
        // The head slot holds the oldest value once the window is full;
        // before that the window is still filling and nothing evicts.
        if (count < window.length) {
            ++count;
        } else {
            total -= window[head];
        }
        window[head] = val;
        total += val;
        head = (head + 1) % window.length;
        return (double) total / count;
    }
}
