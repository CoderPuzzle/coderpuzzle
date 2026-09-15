class Solution {
  public:
    // Work backwards from (tx, ty): with x > y the last move must have raised
    // x, so the predecessor is unique. x >= 2y means x was doubled (halve it,
    // requiring even x); otherwise y was added to x (subtract).
    int minMoves(int sx, int sy, int tx, int ty) {
        int moves = 0;
        while (tx != sx || ty != sy) {
            if (tx < sx || ty < sy)
                return -1;
            if (tx == ty) {
                // Equal coordinates can only be reached from an axis; step
                // onto the axis the source lies on.
                if (sx == 0 && sy > 0) {
                    tx = 0;
                } else if (sy == 0 && sx > 0) {
                    ty = 0;
                } else {
                    return -1;
                }
            } else if (tx > ty) {
                if (tx / 2 >= ty) {
                    if (tx % 2)
                        return -1;
                    tx /= 2;
                } else {
                    tx -= ty;
                }
            } else {
                if (ty / 2 >= tx) {
                    if (ty % 2)
                        return -1;
                    ty /= 2;
                } else {
                    ty -= tx;
                }
            }
            moves++;
        }
        return moves;
    }
};
