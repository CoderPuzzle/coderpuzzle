class Solution {

    public int minimumIndex(int[] capacity, int itemSize) {
        // The earliest index wins ties, so only a strictly smaller
        // fitting capacity replaces the current best.
        int bestIndex = -1;
        int bestCapacity = Integer.MAX_VALUE;
        for (int i = 0; i < capacity.length; i++) {
            if (capacity[i] >= itemSize && capacity[i] < bestCapacity) {
                bestCapacity = capacity[i];
                bestIndex = i;
            }
        }
        return bestIndex;
    }
}
