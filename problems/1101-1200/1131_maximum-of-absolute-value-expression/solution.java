class Solution {

    public int maxAbsValExpr(int[] arr1, int[] arr2) {
        // |A|+|B|+|C| = max over sign triples of s1*A + s2*B + s3*C, so the
        // best pair distance is the widest span of one of 8 projections.
        int best = Integer.MIN_VALUE;
        for (int s1 : new int[] { 1, -1 }) {
            for (int s2 : new int[] { 1, -1 }) {
                for (int s3 : new int[] { 1, -1 }) {
                    int high = s1 * arr1[0] + s2 * arr2[0];
                    int low = high;
                    for (int k = 0; k < arr1.length; ++k) {
                        int value = s1 * arr1[k] + s2 * arr2[k] + s3 * k;
                        if (value > high) high = value;
                        else if (value < low) low = value;
                    }
                    best = Math.max(best, high - low);
                }
            }
        }
        return best;
    }
}
