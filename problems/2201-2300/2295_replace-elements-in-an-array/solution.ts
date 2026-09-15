function arrayChange(nums: number[], operations: number[][]): number[] {
    const finalName = new Map<number, number>();
    for (let index = operations.length - 1; index >= 0; index--) {
        const [replaced, replacement] = operations[index];
        finalName.set(replaced, finalName.get(replacement) ?? replacement);
    }
    return nums.map((value) => finalName.get(value) ?? value);
}
