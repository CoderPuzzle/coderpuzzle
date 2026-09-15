// A square is white exactly when its file and rank have opposite
// parities: a1 is black (1 + 1 is even), and every step along a file or
// a rank flips the color, so the color is the parity of file + rank --
// odd sums are white, even sums are black. Both characters are read
// straight from the coordinate, and nothing exceeds 16, so every
// language runs exact small integers.
function squareIsWhite(coordinates: string): boolean {
    const file = coordinates.charCodeAt(0) - 97 + 1;
    const rank = coordinates.charCodeAt(1) - 48;
    return (file + rank) % 2 === 1;
}
