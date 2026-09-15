class Solution {
  public:
    int minimumOperations(vector<int> &nums) {
        // Elements are independent: each operation touches exactly one
        // element, so every element needs only the distance from its
        // nearest multiple of 3 — a remainder of 1 or 2 costs exactly one
        // +/- 1, remainder 0 costs nothing.
        int ops = 0;
        for (int v : nums) {
            int r = v % 3;
            ops += min(r, (3 - r) % 3);
        }
        return ops;
    }
};
