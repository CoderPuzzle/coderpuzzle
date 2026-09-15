// Scan left to right keeping a stack of settled elements; when the incoming
// value equals the top, merge them into their sum and keep cascading left
// while the new sum equals the new top — the final stack is the answer.
function mergeAdjacent(nums: number[]): number[] {
    const stack: number[] = [];
    for (const value of nums) {
        if (stack.length > 0 && stack[stack.length - 1] === value) {
            let merged = stack.pop() + value;
            while (stack.length > 0 && stack[stack.length - 1] === merged) {
                merged += stack.pop();
            }
            stack.push(merged);
        } else {
            stack.push(value);
        }
    }
    return stack;
}
