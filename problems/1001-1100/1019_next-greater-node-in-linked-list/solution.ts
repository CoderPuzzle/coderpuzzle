function nextLargerNodes(head: ListNode | null): number[] {
    const values: number[] = [];
    for (let node = head; node !== null; node = node.next) {
        values.push(node.val);
    }
    const answer: number[] = new Array(values.length).fill(0);
    const stack: number[] = []; // indices with values in decreasing order
    for (let i = 0; i < values.length; i++) {
        while (stack.length > 0 && values[stack[stack.length - 1]] < values[i]) {
            answer[stack.pop()!] = values[i];
        }
        stack.push(i);
    }
    return answer;
}
