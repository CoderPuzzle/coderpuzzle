function numRabbits(answers: number[]): number {
    // A rabbit answering k fixes its whole color group at k+1 rabbits,
    // and rabbits with different answers can never share one, so every
    // answer value is an independent subproblem. When k is reported c
    // times, those rabbits fill ceil(c / (k+1)) groups - the most one
    // group can hold - and each group counts in full, whether or not
    // all of its rabbits answered.
    const count = new Map<number, number>();
    for (const answer of answers) {
        count.set(answer, (count.get(answer) ?? 0) + 1);
    }
    let total = 0;
    for (const [answer, freq] of count) {
        const group = answer + 1;
        total += Math.ceil(freq / group) * group;
    }
    return total;
}
