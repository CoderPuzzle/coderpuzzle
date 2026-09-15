class Solution {

    public boolean checkTwoChessboards(String coordinate1, String coordinate2) {
        // A square's color follows the parity of column index plus row
        // number; character-code offsets are even, so raw codes keep it.
        int p1 = (coordinate1.charAt(0) + coordinate1.charAt(1)) % 2;
        int p2 = (coordinate2.charAt(0) + coordinate2.charAt(1)) % 2;
        return p1 == p2;
    }
}
