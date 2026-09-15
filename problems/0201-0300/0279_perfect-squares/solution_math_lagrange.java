class Solution {

    public int numSquares(int n) {
        // Legendre's three-square theorem: n is a sum of three squares
        // unless it has the form 4^a(8b+7). Strip the factors of 4, then
        // test the leftover's residue mod 8.
        int remainder = n;
        while (remainder % 4 == 0) {
            remainder /= 4;
        }
        if (remainder % 8 == 7) {
            // No three (or fewer) squares reach such a number, so Lagrange's
            // four-square theorem pins the answer at exactly 4.
            return 4;
        }
        // One square: n itself.
        if (isSquare(n)) {
            return 1;
        }
        // Two squares: some a pairs with the leftover square n - a·a.
        for (int a = 1; a * a * 2 <= n; a++) {
            if (isSquare(n - a * a)) {
                return 2;
            }
        }
        // 4 is ruled out by Legendre, 1 and 2 by the checks above.
        return 3;
    }

    private boolean isSquare(int x) {
        long root = Math.round(Math.sqrt(x));
        return root * root == x;
    }
}
