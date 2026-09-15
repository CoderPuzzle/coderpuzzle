import java.util.Arrays;

class Solution {

    public int numRescueBoats(int[] people, int limit) {
        int[] sorted = people.clone();
        Arrays.sort(sorted);
        int i = 0;
        int j = sorted.length - 1;
        int boats = 0;
        while (i <= j) {
            // The heaviest boards either way; the lightest is their best
            // partner, since a heavier one only risks exceeding the limit.
            // The i < j guard keeps the last person from pairing with themself.
            if (i < j && sorted[i] + sorted[j] <= limit) {
                i++;
            }
            j--;
            boats++;
        }
        return boats;
    }
}
