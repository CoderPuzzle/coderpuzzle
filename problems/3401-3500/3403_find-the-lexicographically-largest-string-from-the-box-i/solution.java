class Solution {

    // One piece can hold at most n - numFriends + 1 letters (the other
    // numFriends - 1 pieces need one each), and for numFriends > 1 every
    // such capped slice really is a piece of some split, so the box's
    // maximum is the largest capped slice over all start positions.
    public String answerString(String word, int numFriends) {
        if (numFriends == 1) {
            return word;
        }
        int limit = word.length() - numFriends + 1;
        String best = "";
        for (int i = 0; i < word.length(); ++i) {
            int end = Math.min(i + limit, word.length());
            String candidate = word.substring(i, end);
            if (candidate.compareTo(best) > 0) {
                best = candidate;
            }
        }
        return best;
    }
}
