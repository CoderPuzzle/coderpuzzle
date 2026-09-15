class Solution {
  public:
    long long maxEnergyBoost(vector<int> &energyDrinkA, vector<int> &energyDrinkB) {
        // A plan that drinks A at hour i either drank A at hour i-1 or
        // drank B at hour i-2 and idled through the cleanse hour i-1, so
        // dpA[i] = max(dpA[i-1], dpB[i-2]) + energyDrinkA[i] and
        // symmetrically for B. Four rolling variables carry the current
        // pair and the one-hour-older pair; totals reach 10^10, past the
        // 32-bit range.
        long long a = (long long)energyDrinkA[0] + energyDrinkA[1];
        long long b = (long long)energyDrinkB[0] + energyDrinkB[1];
        long long old_a = energyDrinkA[0], old_b = energyDrinkB[0];
        for (int i = 2; i < (int)energyDrinkA.size(); i++) {
            long long next_a = max(a, old_b) + energyDrinkA[i];
            long long next_b = max(b, old_a) + energyDrinkB[i];
            old_a = a;
            old_b = b;
            a = next_a;
            b = next_b;
        }
        return max(a, b);
    }
};
