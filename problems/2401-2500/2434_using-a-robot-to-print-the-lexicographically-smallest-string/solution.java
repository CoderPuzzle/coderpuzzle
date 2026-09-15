class Solution {

    public String robotWithString(String s) {
        int n = s.length();
        // t behaves as a stack: characters enter in s's order and leave
        // from the end, so the paper receives some pop sequence.
        // suffixMin[i] = smallest char still to arrive from s[i:]; the
        // sentinel at n exceeds every letter and also serves the drain.
        char[] suffixMin = new char[n + 1];
        suffixMin[n] = 127;
        for (int i = n - 1; i >= 0; i--) {
            suffixMin[i] = (char) Math.min(s.charAt(i), suffixMin[i + 1]);
        }
        StringBuilder st = new StringBuilder();
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            // Pop the top while nothing smaller remains unread: writing it
            // now is never wrong, since later arrivals are >= top. Ties pop
            // early too — safe and never a wasted hold.
            while (st.length() > 0 && st.charAt(st.length() - 1) <= suffixMin[i]) {
                out.append(st.charAt(st.length() - 1));
                st.deleteCharAt(st.length() - 1);
            }
            st.append(s.charAt(i));
        }
        // Input exhausted: flush the rest (the sentinel makes this the
        // same condition as the main loop).
        while (st.length() > 0) {
            out.append(st.charAt(st.length() - 1));
            st.deleteCharAt(st.length() - 1);
        }
        return out.toString();
    }
}
