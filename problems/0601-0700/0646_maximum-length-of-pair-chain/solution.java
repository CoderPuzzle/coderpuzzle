import java.util.Arrays;

class Solution {

    public int findLongestChain(int[][] pairs) {
        // Taking the compatible pair that ends earliest leaves the most room,
        // so sorting by right endpoint makes a single greedy pass optimal.
        Arrays.sort(pairs, (a, b) -> Integer.compare(a[1], b[1]));
        int length = 0;
        long currentEnd = Long.MIN_VALUE;
        for (int[] pair : pairs) {
            // Strict > encodes the strict b < c rule; touching pairs can't chain.
            if (pair[0] > currentEnd) {
                length++;
                currentEnd = pair[1];
            }
        }
        return length;
    }
}
