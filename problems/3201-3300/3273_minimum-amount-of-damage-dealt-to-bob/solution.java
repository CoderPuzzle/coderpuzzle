import java.util.Arrays;

class Solution {

    public long minDamage(int power, int[] damage, int[] health) {
        int n = damage.length;
        Integer[] order = new Integer[n];
        final double[] ratio = new double[n];
        final int[] times = new int[n];
        long remaining = 0;
        for (int i = 0; i < n; i++) {
            order[i] = i;
            // Enemy i needs ceil(health/power) seconds of focused attack to die.
            times[i] = (health[i] + power - 1) / power;
            ratio[i] = (double) damage[i] / times[i];
            remaining += damage[i];
        }
        // Exchange argument on adjacent kills a, b: only damage_a * t_b versus
        // damage_b * t_a differs between the two orders, so descending
        // damage/time ratio order is globally optimal.
        Arrays.sort(order, (a, b) -> Double.compare(ratio[b], ratio[a]));
        long answer = 0;
        for (int i : order) {
            // While enemy i spends times[i] seconds dying, every enemy still
            // alive (i included) keeps dealing its damage each second.
            answer += remaining * times[i];
            remaining -= damage[i];
        }
        return answer;
    }
}
