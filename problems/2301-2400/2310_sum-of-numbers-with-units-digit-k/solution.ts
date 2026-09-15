function minimumNumbers(num: number, k: number): number {
    if (num === 0) return 0;
    const base = k === 0 ? 10 : k;
    for (let count = 1; count * base <= num; count++) {
        if ((num - count * base) % 10 === 0) return count;
    }
    return -1;
}
