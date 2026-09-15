/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function (head) {
    const values = [];
    for (let node = head; node !== null; node = node.next) {
        values.push(node.val);
    }
    const answer = new Array(values.length).fill(0);
    const stack = []; // indices with values in decreasing order
    for (let i = 0; i < values.length; i++) {
        while (stack.length > 0 && values[stack[stack.length - 1]] < values[i]) {
            answer[stack.pop()] = values[i];
        }
        stack.push(i);
    }
    return answer;
};
