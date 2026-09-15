function numMovesStones(a: number, b: number, c: number): number[] {
    // Sort into x <= y <= z so the two gaps (empty slots between
    // neighbors) are easy to read off.
    const [x, y, z] = [a, b, c].sort((p, q) => p - q);
    if (y - x === 1 && z - y === 1) {
        // No empty slots at all: already consecutive.
        return [0, 0];
    }
    // One move suffices whenever a gap is 0 or 1 stone-width wide, since
    // the far stone can jump straight into what remains.
    const minMoves = y - x <= 2 || z - y <= 2 ? 1 : 2;
    // Every move shrinks the spread z - x by exactly 1 in the best case,
    // and the spread must end at 2 (three consecutive values), so the
    // maximum is the total number of empty slots.
    const maxMoves = z - x - 2;
    return [minMoves, maxMoves];
}
