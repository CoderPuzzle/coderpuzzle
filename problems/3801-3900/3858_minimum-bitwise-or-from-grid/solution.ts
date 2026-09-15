function minimumOR(grid: number[][]): number {
    let forbidden = 0;
    let answer = 0;

    for (let bit = 16; bit >= 0; --bit) {
        const candidate = forbidden | (1 << bit);
        const feasible = grid.every((row) => row.some((value) => (value & candidate) === 0));
        if (feasible) {
            forbidden = candidate;
        } else {
            answer |= 1 << bit;
        }
    }

    return answer;
}
