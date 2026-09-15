import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] filterRestaurants(int[][] restaurants, int veganFriendly, int maxPrice, int maxDistance) {
        // Inclusive caps; the vegan filter only bites when it is 1. Survivors
        // sort by rating desc, then id desc.
        List<int[]> kept = new ArrayList<>();
        for (int[] entry : restaurants) {
            if ((veganFriendly == 0 || entry[2] == 1) && entry[3] <= maxPrice && entry[4] <= maxDistance) {
                kept.add(entry);
            }
        }
        kept.sort((a, b) -> a[1] != b[1] ? Integer.compare(b[1], a[1]) : Integer.compare(b[0], a[0]));
        int[] out = new int[kept.size()];
        for (int i = 0; i < out.length; ++i) {
            out[i] = kept.get(i)[0];
        }
        return out;
    }
}
