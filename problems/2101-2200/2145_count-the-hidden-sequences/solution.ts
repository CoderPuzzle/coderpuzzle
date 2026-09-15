function numberOfArrays(differences: number[], lower: number, upper: number): number {
    let prefix = 0;
    let minimum = 0;
    let maximum = 0;
    for (const difference of differences) {
        prefix += difference;
        minimum = Math.min(minimum, prefix);
        maximum = Math.max(maximum, prefix);
    }
    return Math.max(0, upper - lower - (maximum - minimum) + 1);
}
