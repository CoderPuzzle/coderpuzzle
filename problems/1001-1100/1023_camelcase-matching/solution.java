class Solution {

    public boolean[] camelMatch(String[] queries, String pattern) {
        boolean[] answer = new boolean[queries.length];
        for (int i = 0; i < queries.length; i++) {
            answer[i] = matches(queries[i], pattern);
        }
        return answer;
    }

    // Two-pointer scan: advance the pattern pointer on a match, skip a
    // lowercase letter as an implicit insertion, and reject outright on an
    // uppercase letter that doesn't match. The query matches only if every
    // pattern character was consumed by the end of the scan.
    private boolean matches(String query, String pattern) {
        int j = 0;
        for (int i = 0; i < query.length(); i++) {
            char c = query.charAt(i);
            if (j < pattern.length() && c == pattern.charAt(j)) {
                j++;
            } else if (Character.isUpperCase(c)) {
                return false;
            }
        }
        return j == pattern.length();
    }
}
