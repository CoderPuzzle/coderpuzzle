function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    // Array-based binary min-heap of the surviving heads, ordered by
    // (value, input position): the next node of the output is always the
    // smallest head, and each list keeps exactly one entry in the heap.
    type Entry = { val: number; position: number; node: ListNode };
    const heap: Entry[] = [];
    // The position both breaks value ties (earlier list wins) and keeps the
    // ordering from ever looking at the nodes themselves.
    const earlier = (a: Entry, b: Entry): boolean => (a.val !== b.val ? a.val < b.val : a.position < b.position);
    const swap = (i: number, j: number): void => {
        const held = heap[i]!;
        heap[i] = heap[j]!;
        heap[j] = held;
    };
    const push = (held: Entry): void => {
        heap.push(held);
        let i = heap.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (!earlier(heap[i]!, heap[parent]!)) break;
            swap(i, parent);
            i = parent;
        }
    };
    const pop = (): Entry => {
        const top = heap[0]!;
        const last = heap.pop()!;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const left = 2 * i + 1;
                const right = left + 1;
                let smallest = i;
                if (left < heap.length && earlier(heap[left]!, heap[smallest]!)) smallest = left;
                if (right < heap.length && earlier(heap[right]!, heap[smallest]!)) smallest = right;
                if (smallest === i) break;
                swap(i, smallest);
                i = smallest;
            }
        }
        return top;
    };
    lists.forEach((head, position) => {
        if (head !== null && head !== undefined) {
            push({ val: head.val, position, node: head });
        }
    });
    // Dummy head: every attachment happens the same way and the real head
    // falls out as dummy.next.
    const dummy = new ListNode(0);
    let tail = dummy;
    while (heap.length > 0) {
        const smallest = pop();
        tail.next = smallest.node;
        tail = smallest.node;
        // The node's own list continues through its successor, which
        // re-enters the heap as that list's new single entry.
        if (smallest.node.next !== null && smallest.node.next !== undefined) {
            const next = smallest.node.next;
            push({ val: next.val, position: smallest.position, node: next });
        }
    }
    // Every list ran dry inside the loop, so the last attached node already
    // ends with null and the chain is complete.
    return dummy.next;
}
