function numberOfWeakCharacters(properties: number[][]): number {
    // Attack descending; defense ASCENDING within equal attack so that
    // same-attack characters (who can never weaken each other) only ever
    // meet a running max from strictly higher-attack groups.
    const props = [...properties].sort((a, b) => b[0] - a[0] || a[1] - b[1]);
    let weak = 0;
    // Every earlier character has attack >= the current one's, so the
    // current one is weak exactly when some seen defense is strictly
    // greater -- one running maximum is enough.
    let maxDefense = 0;
    for (const [, defense] of props) {
        if (defense < maxDefense) {
            weak += 1;
        } else {
            // Raise the max only when not weak, so later (lower-attack)
            // groups compare against it.
            maxDefense = defense;
        }
    }
    return weak;
}
