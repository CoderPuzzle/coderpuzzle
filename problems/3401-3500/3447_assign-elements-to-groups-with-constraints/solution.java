import java.util.Arrays;

class Solution {

    // Sieve from the smallest element index: the first occurrence of each
    // value claims every multiple it divides, so each group size reads off
    // the earliest qualifying element index.
    public int[] assignElements(int[] groups, int[] elements) {
        int limit = 100_001;
        int[] best = new int[limit];
        Arrays.fill(best, -1);
        boolean[] seen = new boolean[limit];
        for (int index = 0; index < elements.length; index++) {
            int value = elements[index];
            if (seen[value]) {
                continue;
            }
            seen[value] = true;
            for (int multiple = value; multiple < limit; multiple += value) {
                if (best[multiple] == -1) {
                    best[multiple] = index;
                }
            }
        }
        int[] assigned = new int[groups.length];
        for (int i = 0; i < groups.length; i++) {
            assigned[i] = best[groups[i]];
        }
        return assigned;
    }
}
