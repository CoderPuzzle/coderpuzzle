class Solution {

    public int passThePillow(int n, int time) {
        // One forward traversal of the line spans n - 1 seconds, so the
        // walk decomposes into full traversals plus a remainder leg.
        int legs = time / (n - 1);
        int rem = time % (n - 1);
        // An even count of traversals ends moving forward from person 1;
        // an odd count ends moving backward from person n.
        return legs % 2 == 0 ? 1 + rem : n - rem;
    }
}
