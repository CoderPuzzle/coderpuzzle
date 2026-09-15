class Solution {

    public boolean winnerOfGame(String colors) {
        int aliceMoves = 0;
        int bobMoves = 0;

        for (int i = 1; i + 1 < colors.length(); i++) {
            char color = colors.charAt(i);
            if (colors.charAt(i - 1) == color && color == colors.charAt(i + 1)) {
                if (color == 'A') {
                    aliceMoves++;
                } else {
                    bobMoves++;
                }
            }
        }

        return aliceMoves > bobMoves;
    }
}
