class Solution {

    public int[] findBuildings(int[] heights) {
        // A building sees the ocean iff it strictly exceeds the max of
        // everything to its right; sweep inland carrying that max.
        int n = heights.length;
        int[] tmp = new int[n];
        int count = 0;
        int tallest = 0;
        for (int i = n - 1; i >= 0; i--) {
            if (heights[i] > tallest) {
                tmp[count++] = i;
                tallest = heights[i];
            }
        }
        int[] out = new int[count];
        for (int i = 0; i < count; i++) {
            out[i] = tmp[count - 1 - i];
        }
        return out;
    }
}
