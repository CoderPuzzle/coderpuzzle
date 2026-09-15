function isWinner(player1: number[], player2: number[]): number {
    // A turn is worth double the pins when either of the two previous turns
    // was a strike (10); each score is one linear pass.
    const score = (values: number[]): number => {
        let total = 0;
        for (let index = 0; index < values.length; index++) {
            const doubled = values.slice(Math.max(0, index - 2), index).includes(10);
            total += doubled ? 2 * values[index] : values[index];
        }
        return total;
    };
    const score1 = score(player1);
    const score2 = score(player2);
    return score1 > score2 ? 1 : score2 > score1 ? 2 : 0;
}
