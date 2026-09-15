import java.util.Arrays;

class Solution {

    public int minimumBoxes(int[] apple, int[] capacity) {
        // Packs split freely across boxes, so only the apple total
        // matters, not its division into packs. Filling the largest
        // boxes first makes each selected box cover as much of the
        // total as possible, so the prefix of the descending-sorted
        // capacities is optimal.
        int total = 0;
        for (int pack : apple) {
            total += pack;
        }
        Arrays.sort(capacity);
        int filled = 0;
        for (int i = capacity.length - 1; i >= 0; i--) {
            filled += capacity[i];
            if (filled >= total) {
                return capacity.length - i;
            }
        }
        // The input guarantees a full redistribution is possible.
        return capacity.length;
    }
}
