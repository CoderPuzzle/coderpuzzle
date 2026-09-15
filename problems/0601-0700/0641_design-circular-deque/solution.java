class MyCircularDeque {

    // A fixed buffer, a head index, and an occupied count: the count (not
    // a tail index) distinguishes full from empty, so all k slots are
    // usable; both ends are derivable, the rear sits at
    // (head + count - 1) % k and the slot a front insert claims at
    // (head - 1 + k) % k.
    private final int[] buf;
    private int head = 0;
    private int count = 0;

    public MyCircularDeque(int k) {
        buf = new int[k];
    }

    public boolean insertFront(int value) {
        if (count == buf.length) {
            return false;
        }
        // Step head back one slot, modulo the ring, and write there.
        head = (head - 1 + buf.length) % buf.length;
        buf[head] = value;
        ++count;
        return true;
    }

    public boolean insertLast(int value) {
        if (count == buf.length) {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        buf[(head + count) % buf.length] = value;
        ++count;
        return true;
    }

    public boolean deleteFront() {
        if (count == 0) {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        head = (head + 1) % buf.length;
        --count;
        return true;
    }

    public boolean deleteLast() {
        if (count == 0) {
            return false;
        }
        // The rear slot is derivable, so retiring it is just a count.
        --count;
        return true;
    }

    public int getFront() {
        return count == 0 ? -1 : buf[head];
    }

    public int getRear() {
        return count == 0 ? -1 : buf[(head + count - 1) % buf.length];
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == buf.length;
    }
}
