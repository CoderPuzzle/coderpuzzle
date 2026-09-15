#include <stack>

// Two stacks, transferred lazily: the in stack holds new arrivals, the
// out stack serves the front once the reversal has happened.
class MyQueue {
  public:
    MyQueue() = default;

    void push(int x) { in_stack.push(x); }

    int pop() {
        transfer_if_needed();
        int value = out_stack.top();
        out_stack.pop();
        return value;
    }

    int peek() {
        transfer_if_needed();
        return out_stack.top();
    }

    bool empty() { return in_stack.empty() && out_stack.empty(); }

  private:
    void transfer_if_needed() {
        // Only when the out stack is dry; pushing onto leftovers would put
        // newcomers ahead of them. The reversal parks the oldest element
        // on top of the out stack.
        if (out_stack.empty()) {
            while (!in_stack.empty()) {
                out_stack.push(in_stack.top());
                in_stack.pop();
            }
        }
    }

    std::stack<int> in_stack;  // top = newest push
    std::stack<int> out_stack; // top = oldest element (queue front)
};
