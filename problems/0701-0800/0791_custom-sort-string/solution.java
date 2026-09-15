class Solution {

    public String customSortString(String order, String s) {
        // How many of each letter s holds; the alphabet is a fixed
        // constant, so 26 slots replace a hash map.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        StringBuilder out = new StringBuilder();
        // Emission pass 1: walk order itself, emitting each letter it
        // names as many times as s holds it. order's sequence IS the
        // relative order the answer must carry, so this prefix already
        // satisfies it; letters absent from s contribute nothing. The
        // zeroing doubles as a membership mark for pass 2.
        for (int i = 0; i < order.length(); i++) {
            char c = order.charAt(i);
            int slot = c - 'a';
            if (counts[slot] > 0) {
                for (int r = 0; r < counts[slot]; r++) {
                    out.append(c);
                }
                counts[slot] = 0;
            }
        }
        // Emission pass 2: leftovers. Letters order never mentions are
        // unconstrained, so the pinned form sends them to the tail in
        // their original s order — walk s and keep the still-counted.
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int slot = c - 'a';
            if (counts[slot] > 0) {
                out.append(c);
                counts[slot]--;
            }
        }
        return out.toString();
    }
}
