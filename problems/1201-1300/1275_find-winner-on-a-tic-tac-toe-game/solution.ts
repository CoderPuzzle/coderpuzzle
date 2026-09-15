function tictactoe(moves: number[][]): string {
    // Tally each player's occupancy per row and column as moves land, the
    // diagonals directly (+1 for A, -1 for B); a tally reaching +-3 is a
    // completed line. In a valid transcript the game stops at the first
    // completed line, so the mover who completes one wins on the spot and
    // later moves cannot exist.
    const rows = [0, 0, 0];
    const cols = [0, 0, 0];
    let diag = 0;
    let anti = 0;
    for (let i = 0; i < moves.length; i++) {
        const r = moves[i][0];
        const c = moves[i][1];
        const step = i % 2 === 0 ? 1 : -1;
        rows[r] += step;
        cols[c] += step;
        if (r === c) {
            diag += step;
        }
        if (r + c === 2) {
            anti += step;
        }
        const reach = Math.max(Math.abs(rows[r]), Math.abs(cols[c]), Math.abs(diag), Math.abs(anti));
        if (reach === 3) {
            return step === 1 ? "A" : "B";
        }
    }
    return moves.length === 9 ? "Draw" : "Pending";
}
