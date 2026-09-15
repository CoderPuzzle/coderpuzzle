class Solution {

    public int minimumCost(String sentence, int k) {
        String[] words = sentence.split(" ");
        int count = words.length;
        long[] dp = new long[count + 1];

        for (int start = count - 1; start >= 0; --start) {
            long best = Long.MAX_VALUE;
            int rowLength = 0;
            for (int end = start; end < count; ++end) {
                rowLength += words[end].length() + (end > start ? 1 : 0);
                if (rowLength > k) break;
                long candidate;
                if (end == count - 1) {
                    candidate = 0;
                } else {
                    long unused = k - rowLength;
                    candidate = unused * unused + dp[end + 1];
                }
                best = Math.min(best, candidate);
            }
            dp[start] = best;
        }
        return (int) dp[0];
    }
}
