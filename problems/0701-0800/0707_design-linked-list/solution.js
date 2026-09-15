// A singly linked list behind a sentinel head, with the length kept in a
// counter so every index check is a comparison instead of a walk: all insert
// positions funnel through addAtIndex, and the boundary rules (index ==
// length appends, index > length is a no-op, invalid reads return -1,
// invalid deletes are skipped) live in exactly one place each.
class MyNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class MyLinkedList {
    constructor() {
        this.head = new MyNode(0); // sentinel: always present, never carries data
        this.size = 0;
    }

    get(index) {
        if (index < 0 || index >= this.size) {
            return -1;
        }
        return this.before(index).next.val;
    }

    addAtHead(val) {
        this.addAtIndex(0, val);
    }

    addAtTail(val) {
        this.addAtIndex(this.size, val);
    }

    addAtIndex(index, val) {
        if (index > this.size) {
            return;
        }
        if (index < 0) {
            index = 0;
        }
        const front = this.before(index);
        front.next = new MyNode(val, front.next);
        this.size++;
    }

    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) {
            return;
        }
        const front = this.before(index);
        front.next = front.next.next;
        this.size--;
    }

    // The cell in front of position index, for 0 <= index <= size: the
    // sentinel for index 0, the (index-1)-th cell otherwise.
    before(index) {
        let front = this.head;
        for (let step = 0; step < index; step++) {
            front = front.next;
        }
        return front;
    }
}
