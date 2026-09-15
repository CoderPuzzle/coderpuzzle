function sequentialDigits(low: number, high: number): number[] {
    // A sequential number is fully determined by its first digit and its
    // length — at most 9 lengths x 9 starting digits minus the runs that
    // would pass 9. Slide a fixed-length window over "123456789" for each
    // length; every window cut is one candidate, already in ascending
    // order because longer windows only add larger values.
    const digits = "123456789";
    const result: number[] = [];
    for (let length = 2; length <= 9; length++) {
        for (let start = 0; start + length <= 9; start++) {
            const value = parseInt(digits.slice(start, start + length), 10);
            if (value > high) {
                break;
            }
            if (value >= low) {
                result.push(value);
            }
        }
    }
    return result;
}
