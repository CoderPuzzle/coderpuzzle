class Solution {

    public int repeatedStringMatch(String a, String b) {
        int n = a.length(),
            m = b.length();
        // q = ceil(m/n) is the least count whose text is even as long as b,
        // and no occurrence needs more than q + 1: a repeated forever has
        // period n, so any occurrence of b slides into the first q + 1 copies.
        int q = (m + n - 1) / n;
        String repeated = a.repeat(q);
        if (repeated.contains(b)) return q;
        repeated = repeated + a;
        if (repeated.contains(b)) return q + 1;
        return -1;
    }
}
