class Solution {
  public:
    long long maximumPoints(vector<int> &enemyEnergies, int currentEnergy) {
        // Keep the smallest enemy unmarked as a recharge battery: its value
        // m is the cheapest point source, and if the initial energy cannot
        // beat even m, no first point is possible (marking needs one).
        // Otherwise every other enemy gets marked eventually and each lot of
        // m converts to a point, so the answer divides initial energy plus
        // all other energies by m. The sum stays below 10^5 * 10^9 + 10^9,
        // so accumulate in a long long.
        int smallest = *min_element(enemyEnergies.begin(), enemyEnergies.end());
        if (currentEnergy < smallest) {
            return 0LL;
        }
        long long total = currentEnergy;
        for (int e : enemyEnergies) {
            total += e;
        }
        return (total - smallest) / smallest;
    }
};
