class Solution {

    // AND distributes over XOR: (a&b)^(a&c) = a&(b^c). Folding that
    // repeatedly collapses all n*m pair terms to xor(arr1) & xor(arr2).
    public int getXORSum(int[] arr1, int[] arr2) {
        int x = 0;
        for (int a : arr1) {
            x ^= a;
        }
        int y = 0;
        for (int b : arr2) {
            y ^= b;
        }
        return x & y;
    }
}
