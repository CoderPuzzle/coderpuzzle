// The player to move wins exactly when some flip of a "++" hands the
// opponent a position from which they cannot win; a position with no "++"
// left is a loss. A flip never crosses a '-', so the game decomposes into
// independent '+'-runs: memoize on the sorted lengths of the live runs
// (>= 2), which alone decide the position.
function canWin(currentState: string): boolean {
    const memo = new Map<string, boolean>();
    const runs: number[] = currentState
        .split("-")
        .filter((run) => run.length > 0)
        .map((run) => run.length);

    const canWinRuns = (runs: number[]): boolean => {
        const live = runs.filter((run) => run >= 2).sort((a, b) => a - b);
        const key = live.join(",");
        const cached = memo.get(key);
        if (cached !== undefined) return cached;
        let winner = false;
        for (let index = 0; index < live.length && !winner; ++index) {
            const length = live[index];
            const others = live.slice(0, index).concat(live.slice(index + 1));
            // Flipping spot i inside `length` leaves runs i and length-2-i;
            // the mirror split makes the same successor, so half the range.
            for (let i = 0; i <= (length - 2) / 2 && !winner; ++i) {
                const next = others.slice();
                if (i >= 2) next.push(i);
                if (length - 2 - i >= 2) next.push(length - 2 - i);
                if (!canWinRuns(next)) winner = true;
            }
        }
        memo.set(key, winner);
        return winner;
    };

    return canWinRuns(runs);
}
