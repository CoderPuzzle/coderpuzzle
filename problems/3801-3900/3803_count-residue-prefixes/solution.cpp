class Solution {
  public:
    int residuePrefixes(string s) {
        // The prefix of length i is a residue when its distinct-character
        // count equals i % 3. A single left-to-right pass carries that
        // count in a seen-table: after absorbing character i the table
        // records exactly the distinct characters of the prefix that
        // ends there. Lengths divisible by 3 never qualify (a non-empty
        // prefix has at least one distinct character), which the
        // comparison covers without special-casing.
        bool seen[26] = {};
        int distinct = 0;
        int count = 0;
        int i = 0;
        for (char ch : s) {
            i++;
            int idx = ch - 'a';
            if (!seen[idx]) {
                seen[idx] = true;
                distinct++;
            }
            if (distinct == i % 3) {
                count++;
            }
        }
        return count;
    }
};
