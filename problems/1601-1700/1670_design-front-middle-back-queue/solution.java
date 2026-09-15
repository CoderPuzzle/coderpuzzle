import java.util.ArrayDeque;
import java.util.Deque;

class FrontMiddleBackQueue {

    // Two deques split at the middle: front holds the first ceil(n/2)
    // elements, back the rest, so the middle always sits at an end of
    // each deque — balance() restores the split after every mutating call.
    private final Deque<Integer> front = new ArrayDeque<>();
    private final Deque<Integer> back = new ArrayDeque<>();

    public FrontMiddleBackQueue() {}

    public void pushFront(int val) {
        front.addFirst(val);
        balance();
    }

    public void pushMiddle(int val) {
        // The new element must land one slot before the current back of
        // front (the frontmost middle of the result), so when front is
        // the bigger half, its last element moves to back first — the
        // addLast then writes exactly the middle slot.
        if (front.size() > back.size()) {
            back.addFirst(front.removeLast());
        }
        front.addLast(val);
    }

    public void pushBack(int val) {
        back.addLast(val);
        balance();
    }

    public int popFront() {
        if (front.isEmpty()) {
            return -1;
        }
        int val = front.removeFirst();
        balance();
        return val;
    }

    public int popMiddle() {
        // ceil(n/2) elements in front means the frontmost middle — the
        // back of front — at every length, odd or even.
        if (front.isEmpty()) {
            return -1;
        }
        int val = front.removeLast();
        balance();
        return val;
    }

    public int popBack() {
        int val;
        if (!back.isEmpty()) {
            val = back.removeLast();
        } else if (front.isEmpty()) {
            return -1;
        } else {
            val = front.removeLast();
        }
        balance();
        return val;
    }

    private void balance() {
        if (front.size() > back.size() + 1) {
            back.addFirst(front.removeLast());
        } else if (front.size() < back.size()) {
            front.addLast(back.removeFirst());
        }
    }
}
