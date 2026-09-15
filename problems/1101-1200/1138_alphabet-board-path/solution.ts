function alphabetBoardPath(target: string): string {
    let out = "";
    let row = 0,
        col = 0;
    for (const ch of target) {
        const index = ch.charCodeAt(0) - 97;
        // U then L then D then R: horizontal runs never happen inside the
        // truncated row 5, because L precedes the descent to 'z' and U
        // climbs away from 'z' before any R.
        const nrow = Math.floor(index / 5),
            ncol = index % 5;
        out += "U".repeat(Math.max(0, row - nrow));
        out += "L".repeat(Math.max(0, col - ncol));
        out += "D".repeat(Math.max(0, nrow - row));
        out += "R".repeat(Math.max(0, ncol - col));
        out += "!";
        row = nrow;
        col = ncol;
    }
    return out;
}
