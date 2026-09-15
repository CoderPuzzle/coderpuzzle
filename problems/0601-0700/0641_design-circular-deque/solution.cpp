#include <vector>

// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// both ends are derivable, the rear sits at (head + count - 1) % k and
// the slot a front insert claims at (head + k - 1) % k.
class MyCircularDeque {
  public:
    explicit MyCircularDeque(int k) : buf(k, 0) {}

    bool insertFront(int value) {
        if (count == static_cast<int>(buf.size())) {
            return false;
        }
        // Step head back one slot, modulo the ring, and write there.
        head = (head + buf.size() - 1) % buf.size();
        buf[head] = value;
        ++count;
        return true;
    }

    bool insertLast(int value) {
        if (count == static_cast<int>(buf.size())) {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        buf[(head + count) % buf.size()] = value;
        ++count;
        return true;
    }

    bool deleteFront() {
        if (count == 0) {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        head = (head + 1) % buf.size();
        --count;
        return true;
    }

    bool deleteLast() {
        if (count == 0) {
            return false;
        }
        // The rear slot is derivable, so retiring it is just a count.
        --count;
        return true;
    }

    int getFront() { return count == 0 ? -1 : buf[head]; }

    int getRear() { return count == 0 ? -1 : buf[(head + count - 1) % buf.size()]; }

    bool isEmpty() { return count == 0; }

    bool isFull() { return count == static_cast<int>(buf.size()); }

  private:
    std::vector<int> buf;
    int head = 0;
    int count = 0;
};
