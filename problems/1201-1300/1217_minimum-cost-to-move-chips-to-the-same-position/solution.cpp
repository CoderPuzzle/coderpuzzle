class Solution {
  public:
    int minCostToMoveChips(vector<int> &position) {
        // A +-2 move is free, so only parity matters; a +-1 move flips it
        // at cost 1. Pay for whichever side has fewer chips.
        int odd = 0;
        for (int p : position)
            odd += p % 2;
        return min(odd, (int)position.size() - odd);
    }
};
