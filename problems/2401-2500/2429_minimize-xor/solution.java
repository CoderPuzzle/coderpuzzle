class Solution {

    public int minimizeXor(int num1, int num2) {
        // x must carry exactly popcount(num2) set bits and differ from
        // num1 as little as possible. A bit kept from num1 contributes 0
        // to the xor, so spend the budget first on num1's highest set
        // bits (they dominate the value), then set the lowest zero bits
        // with whatever budget remains.
        int budget = Integer.bitCount(num2);
        int x = 0;
        for (int i = 30; i >= 0; i--) {
            int bit = num1 & (1 << i);
            if (bit != 0 && budget > 0) {
                x |= bit;
                budget--;
            }
        }
        for (int i = 0; i < 31 && budget > 0; i++) {
            if ((x & (1 << i)) == 0) {
                x |= 1 << i;
                budget--;
            }
        }
        return x;
    }
}
