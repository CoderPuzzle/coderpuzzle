function countSmaller(nums: number[]): number[] {
    const offset = 10002; // maps nums[i] in [-10^4, 10^4] to a positive index
    const size = 20005;
    const bit: number[] = new Array(size + 1).fill(0);

    const update = (i: number, delta: number): void => {
        while (i <= size) {
            bit[i] += delta;
            i += i & -i;
        }
    };
    const query = (i: number): number => {
        let total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    };

    const result: number[] = [];
    for (let k = nums.length - 1; k >= 0; k--) {
        const index = nums[k] + offset;
        result.push(query(index - 1));
        update(index, 1);
    }
    return result.reverse();
}
