/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseEvenLengthGroups = function (head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let before = dummy;
    let targetLength = 1;

    while (before.next !== null) {
        let groupEnd = before;
        let actualLength = 0;
        while (actualLength < targetLength && groupEnd.next !== null) {
            groupEnd = groupEnd.next;
            actualLength++;
        }

        if (actualLength % 2 === 0) {
            const groupStart = before.next;
            let current = groupStart;
            let previous = groupEnd.next;
            for (let i = 0; i < actualLength; i++) {
                const following = current.next;
                current.next = previous;
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
};
