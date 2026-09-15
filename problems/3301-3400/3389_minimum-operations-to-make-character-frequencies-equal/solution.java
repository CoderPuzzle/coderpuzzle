class Solution {

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
    public int makeStringGood(String s) {
        int[] occ = new int[26];
        for (int i = 0; i < s.length(); ++i) occ[s.charAt(i) - 'a']++;
        int maxOcc = 0;
        for (int count : occ) maxOcc = Math.max(maxOcc, count);
        int best = s.length(); // target c = 0: delete everything
        for (int target = 1; target <= maxOcc; ++target) {
            int keep = Math.abs(occ[0] - target);
            int zero = occ[0];
            for (int i = 1; i < 26; ++i) {
                int need = Math.max(0, target - occ[i]);
                int saveKept = Math.min(Math.max(0, occ[i - 1] - target), need);
                int saveZero = Math.min(occ[i - 1], need);
                int cost = Math.abs(occ[i] - target);
                int nextKeep = Math.min(keep + cost - saveKept, zero + cost - saveZero);
                int nextZero = Math.min(keep, zero) + occ[i];
                keep = nextKeep;
                zero = nextZero;
            }
            best = Math.min(best, Math.min(keep, zero));
        }
        return best;
    }
}
