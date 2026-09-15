function countSmallerOppositeParity(nums: number[]): number[] {
    const values = [...new Set(nums)].sort((a, b) => a - b);
    const ranks = new Map<number, number>(values.map((value, index) => [value, index + 1]));
    const trees: number[][] = Array.from({ length: 2 }, () => new Array(values.length + 1).fill(0));

    function query(tree: number[], index: number): number {
        let total = 0;
        while (index > 0) {
            total += tree[index];
            index -= index & -index;
        }
        return total;
    }

    function update(tree: number[], index: number): void {
        while (index < tree.length) {
            tree[index]++;
            index += index & -index;
        }
    }

    const answer = new Array<number>(nums.length).fill(0);
    for (let i = nums.length - 1; i >= 0; i--) {
        const rank = ranks.get(nums[i])!;
        const parity = nums[i] & 1;
        answer[i] = query(trees[parity ^ 1], rank - 1);
        update(trees[parity], rank);
    }
    return answer;
}
