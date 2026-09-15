class Solution {

    public String minRemoveToMakeValid(String s) {
        int n = s.length();
        boolean[] keep = new boolean[n];
        java.util.Arrays.fill(keep, true);
        java.util.Deque<Integer> opens = new java.util.ArrayDeque<>(); // '(' hoping for a partner
        for (int i = 0; i < n; ++i) {
            char ch = s.charAt(i);
            if (ch == '(') opens.push(i);
            else if (ch == ')') {
                if (!opens.isEmpty()) opens.pop();
                // matched: both survive
                else keep[i] = false; // orphan close, doomed
            }
        }
        for (int i : opens) keep[i] = false; // opens that never found a close
        StringBuilder out = new StringBuilder(n);
        for (int i = 0; i < n; ++i) {
            if (keep[i]) out.append(s.charAt(i));
        }
        return out.toString();
    }
}
