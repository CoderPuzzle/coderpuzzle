#include <queue>
#include <utility>
#include <vector>

// A doubly-linked list of cells keeps stack order -- the tail is the top,
// so push, pop, and top touch only the tail cell -- while a max-heap of
// (value, cell index) pairs finds the maximum. Cell indices rise with every
// push -- the pool only grows -- and the heap prefers the larger one among
// equal values, so its top is the topmost duplicate maximum: exactly the
// element popMax must remove. A removal elsewhere in the list leaves the
// cell's heap entry stale, so each cell carries an alive flag and
// peekMax/popMax discard heap tops that name a dead cell: every stale entry
// is skipped at most once.
class MaxStack {
  public:
    MaxStack() {}

    void push(int x) {
        int index = (int)cells.size();
        cells.push_back(Cell{x, tail, -1, true});
        if (tail != -1) {
            cells[tail].next = index;
        }
        tail = index;
        heap.push({x, index});
    }

    int pop() {
        int index = tail;
        int value = cells[index].value;
        unlink(index);
        return value;
    }

    int top() { return cells[tail].value; }

    int peekMax() {
        while (!cells[heap.top().second].alive) {
            heap.pop();
        }
        return heap.top().first;
    }

    int popMax() {
        while (true) {
            int index = heap.top().second;
            heap.pop();
            if (cells[index].alive) {
                int value = cells[index].value;
                unlink(index);
                return value;
            }
        }
    }

  private:
    struct Cell {
        int value;
        int prev;
        int next;
        bool alive;
    };

    void unlink(int index) {
        int prev = cells[index].prev;
        int next = cells[index].next;
        if (prev != -1) {
            cells[prev].next = next;
        }
        if (next != -1) {
            cells[next].prev = prev;
        }
        if (tail == index) {
            tail = prev;
        }
        cells[index].alive = false;
    }

    vector<Cell> cells;
    priority_queue<pair<int, int>> heap;
    int tail = -1;
};
