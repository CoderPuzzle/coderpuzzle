class Solution {

    public int findLUSlength(String[] strs) {
        // A string can only win as itself: if any other string contains it as
        // a subsequence, every subsequence it could offer is common to both,
        // and equal duplicates contain each other, so both are disqualified.
        int best = -1;
        for (int i = 0; i < strs.length; ++i) {
            boolean contained = false;
            for (int j = 0; j < strs.length && !contained; ++j) {
                if (j == i) continue;
                // Two-pointer scan: walk strs[j] once, advancing in strs[i]
                // whenever the next character matches; containment holds iff
                // all of strs[i] was consumed.
                int at = 0;
                for (int k = 0; k < strs[j].length() && at < strs[i].length(); ++k) {
                    if (strs[i].charAt(at) == strs[j].charAt(k)) ++at;
                }
                contained = at == strs[i].length();
            }
            if (!contained) best = Math.max(best, strs[i].length());
        }
        return best;
    }
}
