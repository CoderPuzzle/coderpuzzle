// A singly linked list behind a sentinel head, with the length kept in a
// counter so every index check is a comparison instead of a walk: all insert
// positions funnel through addAtIndex, and the boundary rules (index ==
// length appends, index > length is a no-op, invalid reads return -1,
// invalid deletes are skipped) live in exactly one place each.
class MyLinkedList {
  public:
    MyLinkedList() {}

    int get(int index) {
        if (index < 0 || index >= size) {
            return -1;
        }
        return before(index)->next->val;
    }

    void addAtHead(int val) { addAtIndex(0, val); }

    void addAtTail(int val) { addAtIndex(size, val); }

    void addAtIndex(int index, int val) {
        if (index > size) {
            return;
        }
        if (index < 0) {
            index = 0;
        }
        Cell *front = before(index);
        Cell *fresh = new Cell();
        fresh->val = val;
        fresh->next = front->next;
        front->next = fresh;
        ++size;
    }

    void deleteAtIndex(int index) {
        if (index < 0 || index >= size) {
            return;
        }
        Cell *front = before(index);
        Cell *dead = front->next;
        front->next = dead->next;
        delete dead;
        --size;
    }

  private:
    struct Cell {
        int val;
        Cell *next;
    };

    // The cell in front of position index, for 0 <= index <= size: the
    // sentinel for index 0, the (index-1)-th cell otherwise.
    Cell *before(int index) {
        Cell *front = &head;
        for (int step = 0; step < index; ++step) {
            front = front->next;
        }
        return front;
    }

    Cell head{};
    int size = 0;
};
