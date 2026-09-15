class Solution {

    public String mergeCharacters(String s, int k) {
        // The stack holds the settled prefix: survivors with no close pair
        // among them. A merge always deletes the right member, so the incoming
        // char — the rightmost — either finds an equal survivor within distance
        // k (its position is stack.length, so the window is the last k
        // survivors) and vanishes, or it settles on top. One sweep replays
        // the rule.
        StringBuilder stack = new StringBuilder();
        int n = s.length();
        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            int lo = Math.max(0, stack.length() - k);
            boolean absorbed = false;
            for (int j = lo; j < stack.length(); j++) {
                if (stack.charAt(j) == c) {
                    absorbed = true;
                    break;
                }
            }
            if (!absorbed) {
                stack.append(c);
            }
        }
        return stack.toString();
    }
}
