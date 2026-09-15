function reverseEvenLengthGroups(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let before: ListNode = dummy;
    let targetLength = 1;

    while (before.next !== null) {
        let groupEnd: ListNode = before;
        let actualLength = 0;
        while (actualLength < targetLength && groupEnd.next !== null) {
            groupEnd = groupEnd.next;
            actualLength++;
        }

        if (actualLength % 2 === 0) {
            const groupStart: ListNode = before.next;
            let current: ListNode | null = groupStart;
            let previous: ListNode | null = groupEnd.next;
            for (let i = 0; i < actualLength; i++) {
                const following: ListNode | null = current!.next;
                current!.next = previous;
                previous = current;
                current = following;
            }
            before.next = previous;
            before = groupStart;
        } else {
            before = groupEnd;
        }
        targetLength++;
    }

    return dummy.next;
}
