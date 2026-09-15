class Solution {

    public boolean findGameWinner(int n) {
        int twoBack = 0;
        int oneBack = 0;
        int childXor = 0;

        for (int order = 1; order <= n; ++order) {
            childXor = twoBack ^ oneBack;
            int current = 1 + childXor;
            twoBack = oneBack;
            oneBack = current;
        }

        return childXor != 0;
    }
}
