import java.util.List;

class Solution {

    public long[] kthPalindrome(int[] queries, int intLength) {
        // The kth palindrome is the kth half-number mirrored, so each query
        // is one string construction; past the 9*10^(half-1) supply it is -1.
        int half = (intLength + 1) / 2;
        long count = 9L * (long) Math.pow(10, half - 1);
        long[] answer = new long[queries.length];
        for (int index = 0; index < queries.length; index++) {
            if (queries[index] > count) {
                answer[index] = -1;
                continue;
            }
            String prefix = Long.toString((long) Math.pow(10, half - 1) + queries[index] - 1);
            StringBuilder digits = new StringBuilder(prefix);
            // Mirror the first intLength/2 digits back onto the end.
            for (int i = intLength / 2 - 1; i >= 0; i--) {
                digits.append(prefix.charAt(i));
            }
            answer[index] = Long.parseLong(digits.toString());
        }
        return answer;
    }
}
