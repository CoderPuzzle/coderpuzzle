class Solution {
  public:
    bool checkTwoChessboards(string coordinate1, string coordinate2) {
        // A square's color follows the parity of column index plus row
        // number; character-code offsets are even, so raw codes keep it.
        int p1 = (coordinate1[0] + coordinate1[1]) % 2;
        int p2 = (coordinate2[0] + coordinate2[1]) % 2;
        return p1 == p2;
    }
};
