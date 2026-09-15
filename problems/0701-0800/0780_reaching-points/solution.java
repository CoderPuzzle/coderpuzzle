class Solution {

    public boolean reachingPoints(int sx, int sy, int tx, int ty) {
        // Work backwards from the target: the last forward move added
        // one coordinate to the other, so the larger must subtract the
        // smaller. Forward moves only grow coordinates, so stop once
        // either drops below its start value.
        while (tx >= sx && ty >= sy) {
            if (tx == sx && ty == sy) {
                return true;
            }
            // Plain modulo cannot land on an arbitrary target: once
            // tx == sx, every remaining backwards step subtracts sx
            // from ty, so the start is reachable exactly when the
            // residue is zero (symmetric for ty == sy).
            if (tx == sx) {
                return (ty - sy) % sx == 0;
            }
            if (ty == sy) {
                return (tx - sx) % sy == 0;
            }
            // The modulo subtracts the smaller coordinate many times at
            // once, Euclidean-style: the same subtraction repeats until
            // the values cross.
            if (tx > ty) {
                tx %= ty;
            } else {
                ty %= tx;
            }
        }
        return false;
    }
}
