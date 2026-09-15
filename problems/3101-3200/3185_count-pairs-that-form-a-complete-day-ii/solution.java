class Solution {

    public long countCompleteDayPairs(int[] hours) {
        // One left-to-right pass keeps a running count per residue class;
        // before joining its own bucket, each index adds the number of
        // earlier values carrying the complementary residue (24 - r) % 24.
        // The pair count reaches C(500000, 2) = 124999750000 at the
        // bounds, far beyond an int, so run the accumulator in a long.
        int[] counts = new int[24];
        long answer = 0L;
        for (int value : hours) {
            int r = value % 24;
            answer += counts[(24 - r) % 24];
            counts[r]++;
        }
        return answer;
    }
}
