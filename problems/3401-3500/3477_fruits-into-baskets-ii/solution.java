class Solution {

    public int numOfUnplacedFruits(int[] fruits, int[] baskets) {
        // The rules fix every decision, so simulate them directly: each fruit
        // takes the leftmost free basket that fits, scanning from index 0.
        boolean[] used = new boolean[baskets.length];
        int unplaced = 0;
        for (int quantity : fruits) {
            int j = 0;
            // skip occupied baskets and capacities that are too small
            while (j < baskets.length && (used[j] || baskets[j] < quantity)) {
                j++;
            }
            // scan ran off the end: nothing fits this fruit
            if (j == baskets.length) {
                unplaced++;
            } else {
                used[j] = true;
            }
        }
        return unplaced;
    }
}
