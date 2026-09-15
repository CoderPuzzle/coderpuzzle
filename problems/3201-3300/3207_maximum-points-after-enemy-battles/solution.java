class Solution {

    public long maximumPoints(int[] enemyEnergies, int currentEnergy) {
        // Keep the smallest enemy unmarked as a recharge battery: its value
        // m is the cheapest point source, and if the initial energy cannot
        // beat even m, no first point is possible (marking needs one).
        // Otherwise every other enemy gets marked eventually and each lot of
        // m converts to a point, so the answer divides initial energy plus
        // all other energies by m. The sum stays below 10^5 * 10^9 + 10^9,
        // so accumulate in a long.
        int smallest = Integer.MAX_VALUE;
        for (int e : enemyEnergies) {
            smallest = Math.min(smallest, e);
        }
        if (currentEnergy < smallest) {
            return 0L;
        }
        long total = currentEnergy;
        for (int e : enemyEnergies) {
            total += e;
        }
        return (total - smallest) / smallest;
    }
}
