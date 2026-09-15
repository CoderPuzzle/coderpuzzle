function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    // One scan of nums2 answers every query: the stack holds values still
    // waiting for their next greater element.
    const nextGreater = new Map<number, number>();
    const stack: number[] = [];
    for (const value of nums2) {
        // The current value is the FIRST greater value to the right of
        // each popped element (anything closer would have popped them
        // already); each element is pushed once, popped at most once.
        while (stack.length > 0 && stack[stack.length - 1] < value) {
            nextGreater.set(stack.pop()!, value);
        }
        stack.push(value);
    }
    // Whatever survives on the stack has nothing greater to its right.
    for (const value of stack) {
        nextGreater.set(value, -1);
    }
    // Values are unique and nums1 is a subset of nums2, so every lookup
    // hits.
    return nums1.map((value) => nextGreater.get(value)!);
}
