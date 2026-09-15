function maxDistance(moves: string): number {
    let x = 0;
    let y = 0;
    let wildcard = 0;
    for (const move of moves) {
        if (move === "R") x++;
        else if (move === "L") x--;
        else if (move === "U") y++;
        else if (move === "D") y--;
        else wildcard++;
    }
    return Math.abs(x) + Math.abs(y) + wildcard;
}
