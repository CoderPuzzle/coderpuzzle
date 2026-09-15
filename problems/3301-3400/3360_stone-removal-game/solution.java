class Solution {

    // Simulate the forced play: removal sizes drop 10, 9, 8, ... and
    // whoever faces a pile smaller than their removal size loses.
    public boolean canAliceWin(int n) {
        boolean aliceToMove = true;
        int take = 10;
        while (n >= take) {
            n -= take;
            take--;
            aliceToMove = !aliceToMove;
        }
        return !aliceToMove;
    }
}
