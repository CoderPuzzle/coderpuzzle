class MyCircularQueue {

    // A fixed buffer, a head index, and an occupied count: the count (not
    // a tail index) distinguishes full from empty, so all k slots are
    // usable; the tail position is always derivable as
    // (head + count) % k.
    private final int[] buf;
    private int head = 0;
    private int count = 0;

    public MyCircularQueue(int k) {
        buf = new int[k];
    }

    public boolean enQueue(int value) {
        if (count == buf.length) {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        buf[(head + count) % buf.length] = value;
        ++count;
        return true;
    }

    public boolean deQueue() {
        if (count == 0) {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        head = (head + 1) % buf.length;
        --count;
        return true;
    }

    public int Front() {
        return count == 0 ? -1 : buf[head];
    }

    public int Rear() {
        return count == 0 ? -1 : buf[(head + count - 1) % buf.length];
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == buf.length;
    }
}
