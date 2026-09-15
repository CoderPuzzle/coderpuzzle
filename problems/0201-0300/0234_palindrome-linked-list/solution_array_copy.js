/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    // Copy the values into an array; the list itself only needs one
    // forward walk.
    const values = [];
    let node = head;
    while (node !== null) {
        values.push(node.val);
        node = node.next;
    }
    // Two-ended compare: i walks forward, j backward, and every mirror
    // pair must agree before the indices meet in the middle.
    let i = 0;
    let j = values.length - 1;
    while (i < j) {
        if (values[i] !== values[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
};
