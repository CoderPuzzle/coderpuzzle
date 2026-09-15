import java.util.ArrayDeque;
import java.util.Deque;

class MyQueue {

    // Two stacks, transferred lazily: the in stack holds new arrivals, the
    // out stack serves the front once the reversal has happened. Each stack
    // is a Deque driven only through its stack methods (push/pop/peek), the
    // JCF-recommended stack — java.util.Stack is a legacy class.
    private final Deque<Integer> inStack = new ArrayDeque<>();
    private final Deque<Integer> outStack = new ArrayDeque<>();

    public MyQueue() {}

    public void push(int x) {
        inStack.push(x);
    }

    public int pop() {
        transferIfNeeded();
        return outStack.pop();
    }

    public int peek() {
        transferIfNeeded();
        return outStack.peek();
    }

    public boolean empty() {
        return inStack.isEmpty() && outStack.isEmpty();
    }

    private void transferIfNeeded() {
        // Only when the out stack is dry; pushing onto leftovers would put
        // newcomers ahead of them. The reversal parks the oldest element
        // on top of the out stack.
        if (outStack.isEmpty()) {
            while (!inStack.isEmpty()) outStack.push(inStack.pop());
        }
    }
}
