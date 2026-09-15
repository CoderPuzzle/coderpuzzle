import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.PriorityQueue;

class DinnerPlates {

    private int capacity;
    private List<Deque<Integer>> stacks = new ArrayList<>();
    // Min-heap of indices that may still have room; entries are validated
    // lazily at push time.
    private PriorityQueue<Integer> vacant = new PriorityQueue<>();

    public DinnerPlates(int capacity) {
        this.capacity = capacity;
    }

    public void push(int val) {
        // Discard stale entries: indices past the trimmed end, and stacks
        // already filled to capacity.
        while (!vacant.isEmpty()) {
            int top = vacant.peek();
            if (top >= stacks.size() || stacks.get(top).size() == capacity) {
                vacant.poll();
            } else {
                break;
            }
        }
        if (!vacant.isEmpty()) {
            int idx = vacant.poll();
            stacks.get(idx).addLast(val);
            // Keep the index available while the stack still has room.
            if (stacks.get(idx).size() < capacity) {
                vacant.offer(idx);
            }
        } else if (!stacks.isEmpty() && stacks.get(stacks.size() - 1).size() < capacity) {
            // No recorded hole left of the tail: tail is leftmost vacant.
            stacks.get(stacks.size() - 1).addLast(val);
        } else {
            Deque<Integer> fresh = new ArrayDeque<>();
            fresh.addLast(val);
            stacks.add(fresh);
        }
    }

    public int pop() {
        // Trailing empty rows are not real stacks for pop's purposes.
        while (!stacks.isEmpty() && stacks.get(stacks.size() - 1).isEmpty()) {
            stacks.remove(stacks.size() - 1);
        }
        if (stacks.isEmpty()) {
            return -1;
        }
        return stacks.get(stacks.size() - 1).removeLast();
    }

    public int popAtStack(int index) {
        if (index >= stacks.size() || stacks.get(index).isEmpty()) {
            return -1;
        }
        int value = stacks.get(index).removeLast();
        // Lazy duplicate entries are fine: staleness is re-checked on push.
        vacant.offer(index);
        return value;
    }
}
