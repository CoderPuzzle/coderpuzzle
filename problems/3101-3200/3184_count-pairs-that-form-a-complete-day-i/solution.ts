function countCompleteDayPairs(hours: number[]): number {
    // With n <= 100 there are at most 4950 pairs, so hint 1's straight
    // double scan is exactly right at this scale. Each value already
    // reaches 1e9, so reducing to residues keeps every intermediate small
    // even though Numbers themselves stay exact well beyond these sums.
    const residues = hours.map((value) => value % 24);
    let count = 0;
    for (let i = 0; i < residues.length; i++) {
        for (let j = i + 1; j < residues.length; j++) {
            if ((residues[i] + residues[j]) % 24 === 0) {
                count++;
            }
        }
    }
    return count;
}
