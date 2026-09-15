class Solution {

    public int[] decode(int[] encoded, int first) {
        // XOR is its own inverse: canceling arr[i] out of
        // encoded[i] = arr[i] ^ arr[i + 1] leaves
        // arr[i + 1] = encoded[i] ^ arr[i]. Seed with first and unroll
        // the chain left to right — the running element is the only
        // unknown in the next equation.
        int[] arr = new int[encoded.length + 1];
        arr[0] = first;
        for (int i = 0; i < encoded.length; i++) {
            arr[i + 1] = arr[i] ^ encoded[i];
        }
        return arr;
    }
}
