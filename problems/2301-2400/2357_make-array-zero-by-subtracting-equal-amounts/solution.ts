function minimumOperations(nums: number[]): number {
    const values = new Set<number>();
    for (const num of nums) {
        if (num > 0) {
            values.add(num);
        }
    }
    return values.size;
}
