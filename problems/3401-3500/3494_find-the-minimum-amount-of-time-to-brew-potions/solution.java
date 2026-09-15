class Solution {

    // No waiting means a potion's passage is rigid: once potion j starts at
    // wizard 0 at time s_j, wizard i finishes it at exactly
    // s_j + mana[j] * pref[i], with pref[i] = skill[0] + ... + skill[i-1].
    // Wizard i accepts potion j only after finishing potion j-1, so the
    // earliest feasible starts obey, with prev = mana[j-1], cur = mana[j],
    //   s_j - s_{j-1} = max_i ( prev * skill[i] + (prev - cur) * pref[i] ),
    // and choosing each s_j minimally is globally optimal since every
    // constraint grows monotonically with earlier starts. The maximand is
    // the upper envelope of the lines skill[i] + t * pref[i] queried at
    // t = (prev - cur) / prev; pref is strictly increasing, so the hull
    // builds in one pass and each query binary-searches it with exact
    // integer cross-multiplications. Times reach ~6.25 * 10^14, so every
    // sum and product runs in long.
    public long minTime(int[] skill, int[] mana) {
        int n = skill.length;
        long[] pref = new long[n + 1];
        for (int i = 0; i < n; ++i) {
            pref[i + 1] = pref[i] + skill[i];
        }

        long[] hullS = new long[n];
        long[] hullP = new long[n];
        int size = 0;
        for (int i = 0; i < n; ++i) {
            // Pop the top line while it is never strictly above its
            // neighbours: skill >= 1 keeps every slope distinct.
            while (
                size >= 2 &&
                (hullS[size - 2] - skill[i]) * (hullP[size - 1] - hullP[size - 2]) <=
                    (hullS[size - 2] - hullS[size - 1]) * (pref[i] - hullP[size - 2])
            ) {
                --size;
            }
            hullS[size] = skill[i];
            hullP[size] = pref[i];
            ++size;
        }

        long total = 0;
        long previous = mana[0];
        for (int j = 1; j < mana.length; ++j) {
            long current = mana[j];
            long p = previous - current;
            long q = previous;
            // Line b beats line a at t = p/q iff q*(s_b - s_a) >= p*(p_a - p_b).
            int lo = 0;
            int hi = size - 1;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (q * (hullS[mid + 1] - hullS[mid]) >= p * (hullP[mid] - hullP[mid + 1])) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            total += hullS[lo] * q + hullP[lo] * p;
            previous = current;
        }
        return total + pref[n] * mana[mana.length - 1];
    }
}
