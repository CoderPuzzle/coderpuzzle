class Solution {

    public int minAddToMakeValid(String s) {
        // A move only inserts, so the answer is how many parentheses are
        // missing. One sweep keeps the count of '(' that no ')' has claimed:
        // a ')' consumes one when available, otherwise it is stranded —
        // nothing later in s can pair with it — and costs an inserted '('.
        // Unclaimed '(' at the end cost an inserted ')' each; both debts
        // are forced and sufficient.
        int insertions = 0;
        int opened = 0;
        for (int i = 0; i < s.length(); ++i) {
            char c = s.charAt(i);
            if (c == '(') {
                opened++;
            } else if (opened > 0) {
                opened--;
            } else {
                insertions++;
            }
        }
        return insertions + opened;
    }
}
