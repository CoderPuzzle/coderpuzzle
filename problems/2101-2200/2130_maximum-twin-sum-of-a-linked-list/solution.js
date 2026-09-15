/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let reversedHalf = null;
    while (slow !== null) {
        const following = slow.next;
        slow.next = reversedHalf;
        reversedHalf = slow;
        slow = following;
    }

    let answer = 0;
    let first = head;
    let second = reversedHalf;
    while (second !== null) {
        answer = Math.max(answer, first.val + second.val);
        first = first.next;
        second = second.next;
    }
    return answer;
};
