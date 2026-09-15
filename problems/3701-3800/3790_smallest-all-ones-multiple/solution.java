class Solution {

    public int minAllOneMultiple(int k) {
        // Only the remainder of the growing repunit matters: appending a
        // digit maps rem -> (rem * 10 + 1) % k, so lengths are walked
        // upward without ever building a number past 10 * k. A nonzero
        // remainder is one of k - 1 values; the seen array flags each
        // visit, and a repeat means the remainders cycle forever -> -1
        // (exactly the k divisible by 2 or 5, since a repunit ends in 1).
        // Every value stays below 1e6, well inside the 32-bit int range.
        int rem = 1 % k;
        int length = 1;
        boolean[] seen = new boolean[k];
        while (rem != 0 && !seen[rem]) {
            seen[rem] = true;
            rem = (rem * 10 + 1) % k;
            length++;
        }
        return rem == 0 ? length : -1;
    }
}
