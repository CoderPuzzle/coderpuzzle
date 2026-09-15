function secondGreaterElement(nums: number[]): number[] {
    const n = nums.length;
    const result: number[] = new Array(n).fill(-1);
    const first: number[] = []; // indices awaiting their first greater value
    const second: number[] = []; // indices awaiting their second greater value
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        while (second.length > 0 && nums[second[second.length - 1]] < x) {
            result[second.pop()!] = x;
        }
        const batch: number[] = [];
        while (first.length > 0 && nums[first[first.length - 1]] < x) {
            batch.push(first.pop()!);
        }
        // batch leaves the first stack in increasing value order; push it
        // back-to-front so the second stack keeps its smallest value on top
        for (let j = batch.length - 1; j >= 0; j--) {
            second.push(batch[j]);
        }
        first.push(i);
    }
    return result;
}
