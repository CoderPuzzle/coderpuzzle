class Solution {

    public int secondHighest(String s) {
        // One pass tracking the two largest distinct digits seen: first
        // is the maximum, second the runner-up. A digit equal to an
        // already-tracked value changes nothing, which is the
        // distinctness rule; -1 survives when fewer than two distinct
        // digits appear.
        int first = -1;
        int second = -1;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= '0' && c <= '9') {
                int v = c - '0';
                if (v > first) {
                    second = first;
                    first = v;
                } else if (second < v && v < first) {
                    second = v;
                }
            }
        }
        return second;
    }
}
