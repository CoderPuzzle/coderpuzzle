class Solution {
  public:
    string answerString(string word, int numFriends) {
        // One piece can hold at most n - numFriends + 1 letters (the other
        // numFriends - 1 pieces need one each), and for numFriends > 1 every
        // such capped slice really is a piece of some split, so the box's
        // maximum is the largest capped slice over all start positions.
        if (numFriends == 1) {
            return word;
        }
        int limit = (int)word.size() - numFriends + 1;
        string best;
        for (int i = 0; i < (int)word.size(); ++i) {
            int end = min(i + limit, (int)word.size());
            if (word.substr(i, end - i) > best) {
                best = word.substr(i, end - i);
            }
        }
        return best;
    }
};
