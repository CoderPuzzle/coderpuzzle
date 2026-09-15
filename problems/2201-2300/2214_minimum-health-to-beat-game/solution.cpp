class Solution {
  public:
    long long minimumHealth(vector<int> &damage, int armor) {
        // Total damage must be survived with health to spare, and the one
        // armor use erases min(armor, worst level) of it.
        long long total = 0;
        int worst = 0;
        for (int hit : damage) {
            total += hit;
            if (hit > worst) {
                worst = hit;
            }
        }
        // total reaches 1e10, so the answer is accumulated in 64 bits.
        return total + 1 - min(armor, worst);
    }
};
