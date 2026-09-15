function divisorGame(n: number): boolean {
    // win[i] is true if the player about to move at value i can force a
    // win. Every position only depends on smaller positions already
    // computed earlier in this same forward sweep.
    const win = new Array(n + 1).fill(false);
    for (let i = 1; i <= n; i++) {
        for (let x = 1; x < i; x++) {
            if (i % x === 0 && !win[i - x]) {
                win[i] = true;
                break;
            }
        }
    }
    return win[n];
}
