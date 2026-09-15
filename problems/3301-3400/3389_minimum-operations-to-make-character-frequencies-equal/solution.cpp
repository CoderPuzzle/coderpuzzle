class Solution {
  public:
    // Only the letter counts matter; a good string has every count at
    // 0 or at some common target c, and c never needs to exceed the
    // largest count. For a fixed c each letter either keeps c copies
    // (cost |occ-c|) or is deleted out (cost occ). One refinement: a
    // unit in the letter just left of a kept letter that still needs
    // copies can change into it instead — the hop replaces the delete
    // the unit would pay anyway and saves an insert, worth 1 per unit,
    // up to how many spare units the left letter has and how many
    // copies the right letter still needs. Those flows only run between
    // adjacent letters, so one pass over the alphabet carrying the
    // previous letter's choice (kept or emptied) prices each target;
    // the answer is the cheapest target.
    int makeStringGood(string s) {
        vector<int> occ(26, 0);
        for (char ch : s)
            occ[ch - 'a']++;
        int maxOcc = *max_element(occ.begin(), occ.end());
        int best = (int)s.size(); // target c = 0: delete everything
        for (int target = 1; target <= maxOcc; ++target) {
            int keep = abs(occ[0] - target);
            int zero = occ[0];
            for (int i = 1; i < 26; ++i) {
                int need = max(0, target - occ[i]);
                int saveKept = min(max(0, occ[i - 1] - target), need);
                int saveZero = min(occ[i - 1], need);
                int cost = abs(occ[i] - target);
                int nextKeep = min(keep + cost - saveKept, zero + cost - saveZero);
                int nextZero = min(keep, zero) + occ[i];
                keep = nextKeep;
                zero = nextZero;
            }
            best = min(best, min(keep, zero));
        }
        return best;
    }
};
