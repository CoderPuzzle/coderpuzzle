class Solution {

    public String tictactoe(int[][] moves) {
        // Tally each player's occupancy per row and column as moves land,
        // diagonals directly (+1 for A, -1 for B); a tally reaching +-3 is
        // a completed line. In a valid transcript the game stops at the
        // first completed line, so the mover who completes one wins on the
        // spot and later moves cannot exist.
        int[] rows = new int[3];
        int[] cols = new int[3];
        int diag = 0;
        int anti = 0;
        for (int i = 0; i < moves.length; i++) {
            int r = moves[i][0];
            int c = moves[i][1];
            int step = i % 2 == 0 ? 1 : -1;
            rows[r] += step;
            cols[c] += step;
            if (r == c) {
                diag += step;
            }
            if (r + c == 2) {
                anti += step;
            }
            if (
                Math.max(Math.max(Math.abs(rows[r]), Math.abs(cols[c])), Math.max(Math.abs(diag), Math.abs(anti))) == 3
            ) {
                return step == 1 ? "A" : "B";
            }
        }
        return moves.length == 9 ? "Draw" : "Pending";
    }
}
