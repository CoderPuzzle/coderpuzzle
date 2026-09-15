// A singly linked list behind a sentinel head, with the length kept in a
// counter so every index check is a comparison instead of a walk: all insert
// positions funnel through addAtIndex, and the boundary rules (index ==
// length appends, index > length is a no-op, invalid reads return -1,
// invalid deletes are skipped) live in exactly one place each.
class MyNode {
    val: number;
    next: MyNode | null;

    constructor(val: number, next: MyNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

class MyLinkedList {
    private head = new MyNode(0); // sentinel: always present, never carries data
    private size = 0;

    constructor() {}

    get(index: number): number {
        if (index < 0 || index >= this.size) {
            return -1;
        }
        return (this.before(index).next as MyNode).val;
    }

    addAtHead(val: number): void {
        this.addAtIndex(0, val);
    }

    addAtTail(val: number): void {
        this.addAtIndex(this.size, val);
    }

    addAtIndex(index: number, val: number): void {
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

    deleteAtIndex(index: number): void {
        if (index < 0 || index >= this.size) {
            return;
        }
        const front = this.before(index);
        front.next = (front.next as MyNode).next;
        this.size--;
    }

    // The cell in front of position index, for 0 <= index <= size: the
    // sentinel for index 0, the (index-1)-th cell otherwise. Invariantly
    // non-null because index <= size keeps the walk on real cells.
    private before(index: number): MyNode {
        let front: MyNode = this.head;
        for (let step = 0; step < index; step++) {
            front = front.next as MyNode;
        }
        return front;
    }
}
