class Solution {

    public int residuePrefixes(String s) {
        // The prefix of length i is a residue when its distinct-character
        // count equals i % 3. A single left-to-right pass carries that
        // count in a seen-table: after absorbing character i the table
        // records exactly the distinct characters of the prefix that
        // ends there. Lengths divisible by 3 never qualify (a non-empty
        // prefix has at least one distinct character), which the
        // comparison covers without special-casing.
        boolean[] seen = new boolean[26];
        int distinct = 0;
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            int idx = s.charAt(i) - 'a';
            if (!seen[idx]) {
                seen[idx] = true;
                distinct++;
            }
            if (distinct == (i + 1) % 3) {
                count++;
            }
        }
        return count;
    }
}
