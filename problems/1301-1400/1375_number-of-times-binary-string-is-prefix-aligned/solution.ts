function numTimesAllBlue(flips: number[]): number {
    let rightmost = 0;
    let count = 0;
    for (let i = 0; i < flips.length; i++) {
        if (flips[i] > rightmost) rightmost = flips[i];
        if (rightmost === i + 1) count += 1;
    }
    return count;
}
