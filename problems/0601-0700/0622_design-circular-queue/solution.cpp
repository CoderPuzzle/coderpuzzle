#include <vector>

// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// the tail position is always derivable as (head + count) % k.
class MyCircularQueue {
  public:
    explicit MyCircularQueue(int k) : buf(k, 0) {}

    bool enQueue(int value) {
        if (count == static_cast<int>(buf.size())) {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        buf[(head + count) % buf.size()] = value;
        ++count;
        return true;
    }

    bool deQueue() {
        if (count == 0) {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        head = (head + 1) % buf.size();
        --count;
        return true;
    }

    int Front() { return count == 0 ? -1 : buf[head]; }

    int Rear() { return count == 0 ? -1 : buf[(head + count - 1) % buf.size()]; }

    bool isEmpty() { return count == 0; }

    bool isFull() { return count == static_cast<int>(buf.size()); }

  private:
    std::vector<int> buf;
    int head = 0;
    int count = 0;
};
