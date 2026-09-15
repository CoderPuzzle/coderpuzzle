function prisonAfterNDays(cells: number[], n: number): number[] {
    // Eight two-state cells admit at most 256 rows, and day one vacates
    // both end cells, leaving 64 — the deterministic daily map must loop.
    // Hash each row to its first day; when the row reappears on day `day`
    // after first being seen on day `first`, the future repeats that
    // day - first cycle, so only (n - day) % cycle further transitions
    // remain.
    const seen = new Map<string, number>();
    let state = cells.join("");
    let day = 0;
    while (day < n && !seen.has(state)) {
        seen.set(state, day);
        cells = nextDay(cells);
        state = cells.join("");
        day++;
    }
    if (day < n) {
        const cycle = day - seen.get(state)!;
        for (let i = 0; i < (n - day) % cycle; i++) {
            cells = nextDay(cells);
        }
    }
    return cells;
}

function nextDay(cells: number[]): number[] {
    const next: number[] = new Array(8).fill(0);
    for (let i = 1; i < 7; i++) {
        next[i] = cells[i - 1] === cells[i + 1] ? 1 : 0;
    }
    return next;
}
