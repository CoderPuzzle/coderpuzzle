function canWinNim(n: number): boolean {
    // Facing 4 stones, every move leaves 1-3 for the opponent to sweep
    // with the last stone — so 4 loses, and every other heap moves to a
    // multiple of 4. Mirror from there: answer every k with 4 - k, so
    // each pair of turns burns exactly 4 stones and the opponent is the
    // one who finally faces 4. The losing positions are exactly the
    // multiples of 4.
    return n % 4 !== 0;
}
