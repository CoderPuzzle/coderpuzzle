import java.util.PriorityQueue;

class MaxStack {

    // A doubly-linked list of cells keeps stack order -- the tail is the top,
    // so push, pop, and top touch only the tail cell -- while a max-heap of
    // cells keyed by (value, sequence number) finds the maximum. Sequence
    // numbers rise with every push and the heap prefers the larger one among
    // equal values, so its top is the topmost duplicate maximum -- exactly
    // the element popMax must remove. A removal elsewhere in the list leaves
    // the cell's heap entry stale, so each cell carries an alive flag and
    // peekMax/popMax discard heap tops that name a dead cell: every stale
    // entry is skipped at most once.
    private static class Cell {

        int value;
        long seq;
        Cell prev;
        Cell next;
        boolean dead;
    }

    private final PriorityQueue<Cell> heap = new PriorityQueue<>((a, b) ->
        a.value != b.value ? Integer.compare(b.value, a.value) : Long.compare(b.seq, a.seq)
    );
    private Cell tail;
    private long seq;

    public MaxStack() {}

    public void push(int x) {
        Cell cell = new Cell();
        cell.value = x;
        cell.seq = ++seq;
        cell.prev = tail;
        if (tail != null) {
            tail.next = cell;
        }
        tail = cell;
        heap.add(cell);
    }

    public int pop() {
        Cell cell = tail;
        unlink(cell);
        return cell.value;
    }

    public int top() {
        return tail.value;
    }

    public int peekMax() {
        while (heap.peek().dead) {
            heap.poll();
        }
        return heap.peek().value;
    }

    public int popMax() {
        while (true) {
            Cell cell = heap.poll();
            if (!cell.dead) {
                unlink(cell);
                return cell.value;
            }
        }
    }

    private void unlink(Cell cell) {
        if (cell.prev != null) {
            cell.prev.next = cell.next;
        }
        if (cell.next != null) {
            cell.next.prev = cell.prev;
        }
        if (tail == cell) {
            tail = cell.prev;
        }
        cell.dead = true;
    }
}
