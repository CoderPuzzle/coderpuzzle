function isPossibleToSplit(nums: number[]): boolean {
    const frequencies = new Map<number, number>();
    for (const num of nums) {
        frequencies.set(num, (frequencies.get(num) ?? 0) + 1);
        if (frequencies.get(num) > 2) {
            return false;
        }
    }
    return true;
}
