/**
 * Definition for singly-linked list. class ListNode { val: number; next:
 * ListNode | null; constructor(val?: number, next?: ListNode | null) {
 * this.val = val === undefined ? 0 : val; this.next = next === undefined ?
 * null : next; } }
 */
function deleteDuplicatesUnsorted(head: ListNode | null): ListNode | null {
    // Two passes: count every value, then keep only the values whose
    // count is exactly one. A dummy node makes deleting the head a
    // non-case.
    const count = new Map<number, number>();
    for (let node = head; node !== null; node = node.next) {
        count.set(node.val, (count.get(node.val) ?? 0) + 1);
    }
    const dummy = new ListNode(0);
    let tail = dummy;
    for (let node = head; node !== null; node = node.next) {
        if (count.get(node.val) === 1) {
            tail.next = node;
            tail = tail.next;
        }
    }
    tail.next = null;
    return dummy.next;
}
