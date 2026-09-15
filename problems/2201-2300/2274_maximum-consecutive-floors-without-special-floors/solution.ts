function maxConsecutive(bottom: number, top: number, special: number[]): number {
    special.sort((left, right) => left - right);
    let best = Math.max(special[0] - bottom, top - special[special.length - 1]);
    for (let i = 1; i < special.length; i++) {
        best = Math.max(best, special[i] - special[i - 1] - 1);
    }
    return best;
}
