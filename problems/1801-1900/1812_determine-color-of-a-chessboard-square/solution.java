class Solution {

    public boolean squareIsWhite(String coordinates) {
        // A square is white exactly when its file and rank have opposite
        // parities: a1 is black (1 + 1 is even), and every step along a
        // file or a rank flips the color, so the color is the parity of
        // file + rank -- odd sums are white, even sums are black. Both
        // characters are read straight from the coordinate, and nothing
        // exceeds 16, so every language runs exact small integers.
        int file = coordinates.charAt(0) - 'a' + 1;
        int rank = coordinates.charAt(1) - '0';
        return (file + rank) % 2 == 1;
    }
}
