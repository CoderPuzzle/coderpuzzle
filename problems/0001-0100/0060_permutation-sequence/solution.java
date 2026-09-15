import java.util.ArrayList;
import java.util.List;

class Solution {

    public String getPermutation(int n, int k) {
        // Digits stay sorted, so the index computed below is the position of
        // the chosen digit among the digits still available.
        List<Integer> digits = new ArrayList<>();
        for (int value = 1; value <= n; value++) digits.add(value);
        // factorials[block] = block! — the size of one block at a position
        // with `block` positions still unfilled after it. 9! fits in 32 bits,
        // but the ranks ride in longs so nothing narrows on the way.
        long[] factorials = new long[n + 1];
        factorials[0] = 1;
        for (int value = 1; value <= n; value++) factorials[value] = factorials[value - 1] * value;
        long rank = k - 1L;
        StringBuilder result = new StringBuilder();
        for (int block = n - 1; block >= 0; block--) {
            // Quotient picks the digit, remainder is the rank inside its block.
            long index = rank / factorials[block];
            rank %= factorials[block];
            result.append(digits.remove((int) index));
        }
        return result.toString();
    }
}
