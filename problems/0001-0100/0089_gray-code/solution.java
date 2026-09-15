class Solution {

    public int[] grayCode(int n) {
        int[] code = new int[1 << n];
        // The pinned order is its own recipe: element at index i is i ^ (i >> 1),
        // the standard reflected gray code. One loop, no post-processing.
        for (int i = 0; i < code.length; i++) {
            code[i] = i ^ (i >>> 1);
        }
        return code;
    }
}
