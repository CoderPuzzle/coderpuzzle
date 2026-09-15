// An explicit LIFO worklist keeps every element as [value, depth] pairs,
// so nesting depth never costs call-stack frames — maxDepth can reach
// 1000, far past what recursion should be trusted with under the runner's
// 512 KB stack. Elements are pushed in reverse so popping yields them in
// original order. A sub-array is expanded only while its own depth d is
// still less than n; anything deeper (or any scalar) lands in the result
// untouched, which makes n=0 a no-op and survivors ride along whole.
type FlatElement = number | any[];

function flat(arr: FlatElement[], depth: number): FlatElement[] {
    const result: FlatElement[] = [];
    const stack: [FlatElement, number][] = [];
    for (let index = arr.length - 1; index >= 0; index--) {
        stack.push([arr[index], 0]);
    }
    while (stack.length > 0) {
        const entry = stack.pop() as [FlatElement, number];
        const value = entry[0];
        const at = entry[1];
        if (Array.isArray(value) && at < depth) {
            for (let index = value.length - 1; index >= 0; index--) {
                stack.push([value[index], at + 1]);
            }
        } else {
            result.push(value);
        }
    }
    return result;
}

class Solution {
    run(flattenCase: FlattenCase): void {
        flattenCase.drive(flat);
    }
}
