class Solution {
  public:
    // Simulate the forced play: removal sizes drop 10, 9, 8, ... and
    // whoever faces a pile smaller than their removal size loses.
    bool canAliceWin(int n) {
        bool aliceToMove = true;
        int take = 10;
        while (n >= take) {
            n -= take;
            take--;
            aliceToMove = !aliceToMove;
        }
        return !aliceToMove;
    }
};
