class Solution {

    public String shortestSuperstring(String s1, String s2) {
        // Containment first: the shorter answer is then always a merge that
        // overlaps a suffix of one string with a prefix of the other, so
        // the scan takes the largest such overlap in either direction and
        // lets the first direction win ties.
        if (s1.contains(s2)) {
            return s1;
        }
        if (s2.contains(s1)) {
            return s2;
        }
        int ov1 = maxOverlap(s1, s2); // suffix of s1 == prefix of s2
        int ov2 = maxOverlap(s2, s1);
        if (ov1 >= ov2) {
            return s1 + s2.substring(ov1);
        }
        return s2 + s1.substring(ov2);
    }

    private int maxOverlap(String a, String b) {
        for (int k = Math.min(a.length(), b.length()); k > 0; --k) {
            if (a.regionMatches(a.length() - k, b, 0, k)) {
                return k;
            }
        }
        return 0;
    }
}
