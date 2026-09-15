import java.util.ArrayDeque;
import java.util.Queue;

class MyStack {

    // One queue, rotated on push: the front is always the stack top, so
    // pop/top/empty are single queue operations on the front.
    private final Queue<Integer> queue = new ArrayDeque<>();

    public MyStack() {}

    public void push(int x) {
        queue.offer(x);
        // Requeue everything that was below x, so x reaches the front.
        int rotations = queue.size() - 1;
        for (int i = 0; i < rotations; ++i) queue.offer(queue.poll());
    }

    public int pop() {
        return queue.poll();
    }

    public int top() {
        return queue.peek();
    }

    public boolean empty() {
        return queue.isEmpty();
    }
}
