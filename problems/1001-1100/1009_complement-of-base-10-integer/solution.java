class Solution {

    public int bitwiseComplement(int n) {
        // Grow a run of ones (1 -> 11 -> 111 -> ...) until it's at least as
        // wide as n's own binary representation; XOR-ing with that window
        // flips every bit n occupies and nothing above it. n < 10^9 keeps
        // the widest mask (2^30 - 1) well inside a 32-bit int, so no wider
        // type is needed.
        int mask = 1;
        while (mask < n) {
            mask = mask * 2 + 1;
        }
        return n ^ mask;
    }
}
