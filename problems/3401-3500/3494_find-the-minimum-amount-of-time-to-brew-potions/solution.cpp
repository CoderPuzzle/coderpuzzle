class Solution {
  public:
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
    // sum and product runs in long long.
    long long minTime(vector<int> &skill, vector<int> &mana) {
        int n = skill.size();
        vector<long long> pref(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            pref[i + 1] = pref[i] + skill[i];
        }

        vector<long long> hull_s(n), hull_p(n);
        int size = 0;
        for (int i = 0; i < n; ++i) {
            // Pop the top line while it is never strictly above its
            // neighbours: skill >= 1 keeps every slope distinct.
            while (size >= 2 && (hull_s[size - 2] - skill[i]) * (hull_p[size - 1] - hull_p[size - 2]) <=
                                    (hull_s[size - 2] - hull_s[size - 1]) * (pref[i] - hull_p[size - 2])) {
                --size;
            }
            hull_s[size] = skill[i];
            hull_p[size] = pref[i];
            ++size;
        }

        long long total = 0;
        long long previous = mana[0];
        for (int j = 1; j < (int)mana.size(); ++j) {
            long long current = mana[j];
            long long p = previous - current;
            long long q = previous;
            // Line b beats line a at t = p/q iff q*(s_b - s_a) >= p*(p_a - p_b).
            int lo = 0, hi = size - 1;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (q * (hull_s[mid + 1] - hull_s[mid]) >= p * (hull_p[mid] - hull_p[mid + 1])) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            total += hull_s[lo] * q + hull_p[lo] * p;
            previous = current;
        }
        return total + pref[n] * mana[mana.size() - 1];
    }
};
