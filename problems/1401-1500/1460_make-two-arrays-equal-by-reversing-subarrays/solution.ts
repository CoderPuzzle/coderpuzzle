function canBeEqual(target: number[], arr: number[]): boolean {
    const counts = new Array(1001).fill(0);
    for (const value of target) {
        counts[value]++;
    }
    for (const value of arr) {
        counts[value]--;
    }
    return counts.every((count) => count === 0);
}
