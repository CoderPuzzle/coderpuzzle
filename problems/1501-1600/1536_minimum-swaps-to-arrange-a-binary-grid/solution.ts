function minSwaps(grid: number[][]): number {
    const n = grid.length;

    const trailingZeros = (row: number[]): number => {
        let count = 0;
        for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] !== 0) {
                break;
            }
            count++;
        }
        return count;
    };

    const zeros = grid.map(trailingZeros);

    let swaps = 0;
    for (let i = 0; i < n; i++) {
        const needed = n - i - 1;
        if (zeros[i] >= needed) {
            continue;
        }
        let j = i + 1;
        while (j < n && zeros[j] < needed) {
            j++;
        }
        if (j === n) {
            return -1;
        }
        while (j > i) {
            [zeros[j], zeros[j - 1]] = [zeros[j - 1], zeros[j]];
            j--;
            swaps++;
        }
    }
    return swaps;
}
