function chalkReplacer(chalk: number[], k: number): number {
    // Whole rounds consume sum(chalk); simulate only the remainder. The
    // total reaches at most 1e5 * 1e5 = 1e10 < 2^53, exact as JS numbers.
    let total = 0;
    for (const c of chalk) {
        total += c;
    }
    let rem = k % total;
    for (let i = 0; i < chalk.length; i++) {
        if (rem < chalk[i]) {
            return i;
        }
        rem -= chalk[i];
    }
    return -1; // unreachable: remainder < total
}
