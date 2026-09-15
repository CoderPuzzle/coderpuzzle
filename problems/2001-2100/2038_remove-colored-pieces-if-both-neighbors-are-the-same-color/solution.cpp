class Solution {
  public:
    bool winnerOfGame(string colors) {
        int aliceMoves = 0;
        int bobMoves = 0;

        for (int i = 1; i + 1 < static_cast<int>(colors.size()); ++i) {
            if (colors[i - 1] == colors[i] && colors[i] == colors[i + 1]) {
                if (colors[i] == 'A') {
                    ++aliceMoves;
                } else {
                    ++bobMoves;
                }
            }
        }

        return aliceMoves > bobMoves;
    }
};
