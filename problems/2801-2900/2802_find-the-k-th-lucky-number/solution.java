class Solution {

    public String kthLuckyNumber(int k) {
        // Grow c until the blocks of all lengths up to c cover k: there are
        // 2^len lucky numbers of length len, cumulatively 2^(c + 1) - 2.
        int c = 1;
        while ((1 << (c + 1)) - 2 < k) {
            c++;
        }
        // Rank of k among the c-digit lucky numbers, made zero-based.
        int x = k - ((1 << c) - 2) - 1;
        // Binary counting in order: read x's c bits from the top, mapping
        // 0 -> 4 and 1 -> 7; bit order mirrors digit order, so this
        // enumerates the block exactly as the statement sorts it.
        StringBuilder digits = new StringBuilder();
        for (int bit = c - 1; bit >= 0; --bit) {
            digits.append(((x >> bit) & 1) == 1 ? '7' : '4');
        }
        return digits.toString();
    }
}
