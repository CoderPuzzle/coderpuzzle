function pairSum(head: ListNode | null): number {
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    let reversedHalf: ListNode | null = null;
    while (slow !== null) {
        const following: ListNode | null = slow.next;
        slow.next = reversedHalf;
        reversedHalf = slow;
        slow = following;
    }

    let answer = 0;
    let first: ListNode | null = head;
    let second: ListNode | null = reversedHalf;
    while (second !== null) {
        answer = Math.max(answer, first!.val + second.val);
        first = first!.next;
        second = second.next;
    }
    return answer;
}
