#include <queue>

// One queue, rotated on push: the front is always the stack top, so
// pop/top/empty are single queue operations on the front.
class MyStack {
  public:
    MyStack() = default;

    void push(int x) {
        queue.push(x);
        // Requeue everything that was below x, so x reaches the front.
        int rotations = (int)queue.size() - 1;
        for (int i = 0; i < rotations; ++i) {
            queue.push(queue.front());
            queue.pop();
        }
    }

    int pop() {
        int value = queue.front();
        queue.pop();
        return value;
    }

    int top() { return queue.front(); }

    bool empty() { return queue.empty(); }

  private:
    std::queue<int> queue;
};
