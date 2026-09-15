class MyLinkedList {

    // A singly linked list behind a sentinel head, with the length kept in a
    // counter so every index check is a comparison instead of a walk: all
    // insert positions funnel through addAtIndex, and the boundary rules
    // (index == length appends, index > length is a no-op, invalid reads
    // return -1, invalid deletes are skipped) live in exactly one place each.
    private static class Cell {

        int val;
        Cell next;
    }

    private final Cell head = new Cell();
    private int size;

    public MyLinkedList() {}

    public int get(int index) {
        if (index < 0 || index >= size) {
            return -1;
        }
        return before(index).next.val;
    }

    public void addAtHead(int val) {
        addAtIndex(0, val);
    }

    public void addAtTail(int val) {
        addAtIndex(size, val);
    }

    public void addAtIndex(int index, int val) {
        if (index > size) {
            return;
        }
        if (index < 0) {
            index = 0;
        }
        Cell front = before(index);
        Cell fresh = new Cell();
        fresh.val = val;
        fresh.next = front.next;
        front.next = fresh;
        size++;
    }

    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) {
            return;
        }
        Cell front = before(index);
        front.next = front.next.next;
        size--;
    }

    private Cell before(int index) {
        Cell front = head;
        for (int step = 0; step < index; ++step) {
            front = front.next;
        }
        return front;
    }
}
