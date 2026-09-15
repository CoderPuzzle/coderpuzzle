function soupServings(n: number): number {
    // Round up to whole servings of 25 mL each.
    const m = Math.floor((n + 24) / 25);
    if (m >= 179) {
        return 1.0;
    }

    const table: number[][] = [];
    for (let a = 0; a <= m; a++) {
        table.push(new Array(m + 1).fill(0.0));
    }

    const value = (a: number, b: number): number => {
        if (a <= 0 && b <= 0) {
            return 0.5;
        }
        if (a <= 0) {
            return 1.0;
        }
        if (b <= 0) {
            return 0.0;
        }
        return table[a][b];
    };

    for (let a = 1; a <= m; a++) {
        for (let b = 1; b <= m; b++) {
            table[a][b] = 0.25 * (value(a - 4, b) + value(a - 3, b - 1) + value(a - 2, b - 2) + value(a - 1, b - 3));
        }
    }

    return value(m, m);
}
