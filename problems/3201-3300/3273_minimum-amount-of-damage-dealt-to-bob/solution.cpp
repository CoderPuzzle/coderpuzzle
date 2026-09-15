class Solution {
  public:
    long long minDamage(int power, vector<int> &damage, vector<int> &health) {
        int n = damage.size();
        vector<int> times(n);
        vector<double> ratio(n);
        vector<int> order(n);
        long long remaining = 0;
        for (int i = 0; i < n; i++) {
            order[i] = i;
            // Enemy i needs ceil(health/power) seconds of focused attack to die.
            times[i] = (health[i] + power - 1) / power;
            ratio[i] = (double)damage[i] / times[i];
            remaining += damage[i];
        }
        // Exchange argument on adjacent kills a, b: only damage_a * t_b versus
        // damage_b * t_a differs between the two orders, so descending
        // damage/time ratio order is globally optimal.
        stable_sort(order.begin(), order.end(), [&](int a, int b) { return ratio[a] > ratio[b]; });
        long long answer = 0;
        for (int i : order) {
            // While enemy i spends times[i] seconds dying, every enemy still
            // alive (i included) keeps dealing its damage each second.
            answer += remaining * times[i];
            remaining -= damage[i];
        }
        return answer;
    }
};
