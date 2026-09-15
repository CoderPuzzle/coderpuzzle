function removeZeroSumSublists(head: ListNode | null): ListNode | null {
    const values: number[] = [];
    for (let node = head; node !== null; node = node.next) {
        values.push(node.val);
    }

    // Prefix-sum scan: when a prefix repeats, drop every node between the
    // earlier occurrence and the current node (inclusive), then restart.
    let restart = true;
    while (restart) {
        restart = false;
        const prefixToIndex = new Map<number, number>([[0, -1]]);
        let prefix = 0;
        for (let i = 0; i < values.length; i++) {
            prefix += values[i];
            if (prefixToIndex.has(prefix)) {
                const j = prefixToIndex.get(prefix)!;
                values.splice(j + 1, i - j);
                restart = true;
                break;
            }
            prefixToIndex.set(prefix, i);
        }
    }

    const dummy = new ListNode(0);
    let current: ListNode | null = dummy;
    for (const value of values) {
        current!.next = new ListNode(value);
        current = current!.next;
    }
    return dummy.next;
}
