class Solution {

    public int numberOfUniqueGoodSubsequences(String binary) {
        final int MOD = 1000000007;
        // end0/end1 = distinct good subsequence VALUES ending in '0'/'1'
        // over the prefix. The lone "0" is the only good value with a
        // leading zero, so it lives in a flag and end0 holds only values
        // starting with '1'.
        long end0 = 0;
        long end1 = 0;
        boolean hasZero = false;
        for (int i = 0; i < binary.length(); i++) {
            // Extending every existing value by ch absorbs the old
            // ending-in-ch set (each was itself an extension of something
            // shorter), so the new count is simply end0 + end1.
            if (binary.charAt(i) == '0') {
                // No lone "0" and never extend "0" itself: both would be
                // leading-zero values. Appending '0' to a 1-initial value is
                // always safe.
                end0 = (end0 + end1) % MOD;
                hasZero = true;
            } else {
                end1 = (end1 + end0 + 1) % MOD; // +1: the character alone
            }
        }
        // Add back the lone "0" if any zero appeared.
        return (int) ((end0 + end1 + (hasZero ? 1 : 0)) % MOD);
    }
}
