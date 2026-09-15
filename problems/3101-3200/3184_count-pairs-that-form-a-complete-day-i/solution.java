class Solution {

    public int countCompleteDayPairs(int[] hours) {
        // With n <= 100 there are at most 4950 pairs, so hint 1's straight
        // double scan is exactly right at this scale. Each value already
        // reaches 10^9, so their raw pairwise sum reaches 2 * 10^9 and
        // would overflow an int; reduce both sides to residues before
        // pairing so nothing exceeds 46.
        int[] residues = new int[hours.length];
        for (int i = 0; i < hours.length; i++) {
            residues[i] = hours[i] % 24;
        }
        int count = 0;
        for (int i = 0; i < hours.length; i++) {
            for (int j = i + 1; j < hours.length; j++) {
                if ((residues[i] + residues[j]) % 24 == 0) {
                    count++;
                }
            }
        }
        return count;
    }
}
