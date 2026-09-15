class Solution {

    public int[] circularPermutation(int n, int start) {
        // Reflected gray code g(i) = i ^ (i >> 1); XOR-ing every entry by
        // start preserves the one-bit-step property and lands p[0] = start.
        int size = 1 << n;
        int[] out = new int[size];
        for (int i = 0; i < size; ++i) out[i] = start ^ (i ^ (i >> 1));
        return out;
    }
}
