function rearrangeString(s: string, x: string, y: string): string {
    const letters = s.split("").sort(); // groups equal letters into blocks
    if (x < y) {
        letters.reverse(); // puts the y block before the x block
    }
    return letters.join("");
}
