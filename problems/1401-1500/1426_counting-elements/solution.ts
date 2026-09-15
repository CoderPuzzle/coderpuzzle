function countElements(arr: number[]): number {
    const seen = new Set(arr);
    let count = 0;
    for (const x of arr) {
        if (seen.has(x + 1)) {
            count++;
        }
    }
    return count;
}
