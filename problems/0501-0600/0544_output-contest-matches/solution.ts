function findContestMatch(n: number): string {
    // One string per surviving side of the bracket, in round order. Each
    // round folds the list against its own reverse: side i meets side
    // m-1-i, the strong-vs-weak pairing, recorded as "(a,b)" with a bare
    // comma and no space.
    let sides: string[] = [];
    for (let team = 1; team <= n; ++team) {
        sides.push(String(team));
    }
    while (sides.length > 1) {
        const m: number = sides.length;
        const next: string[] = [];
        for (let i = 0; i < m / 2; ++i) {
            next.push("(" + sides[i] + "," + sides[m - 1 - i] + ")");
        }
        sides = next;
    }
    return sides[0];
}
