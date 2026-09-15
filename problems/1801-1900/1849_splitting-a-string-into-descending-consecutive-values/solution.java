class Solution {

    // Fixing the first piece forces everything after it: each next piece
    // must read as exactly prev - 1. Leading zeros let several lengths
    // share one value, so backtrack over each matching length. A first
    // piece of 11+ digits cannot work: its successor alone needs 10+ of
    // the at most 9 leftover characters.
    public boolean splitString(String s) {
        int n = s.length();
        for (int firstEnd = 1; firstEnd < Math.min(n, 11); firstEnd++) {
            if (extend(s, firstEnd, Long.parseLong(s.substring(0, firstEnd)))) {
                return true;
            }
        }
        return false;
    }

    private boolean extend(String s, int pos, long prev) {
        long want = prev - 1;
        if (pos == s.length()) {
            return true;
        }
        if (want < 0) {
            return false;
        }
        long v = 0;
        for (int end = pos + 1; end <= s.length(); end++) {
            v = v * 10 + (s.charAt(end - 1) - '0');
            if (v == want && extend(s, end, want)) {
                return true;
            }
            if (v > want) {
                break;
            }
        }
        return false;
    }
}
