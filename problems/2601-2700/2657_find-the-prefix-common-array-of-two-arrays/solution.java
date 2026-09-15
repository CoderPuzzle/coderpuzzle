class Solution {

    public int[] findThePrefixCommonArray(int[] A, int[] B) {
        // One shared walk bumps a frequency counter for each value; because
        // both arrays are permutations, a counter reaching 2 means that value
        // now appears in both prefixes, so each hit raises the running total.
        int[] seen = new int[A.length + 1];
        int common = 0;
        int[] result = new int[A.length];
        for (int index = 0; index < A.length; ++index) {
            if (++seen[A[index]] == 2) common++;
            if (++seen[B[index]] == 2) common++;
            result[index] = common;
        }
        return result;
    }
}
