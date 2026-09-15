class Solution:
    def answerString(self, word: str, numFriends: int) -> str:
        # One piece can hold at most n - numFriends + 1 letters (the other
        # numFriends - 1 pieces need one each), and for numFriends > 1 every
        # such capped slice really is a piece of some split, so the box's
        # maximum is the largest capped slice over all start positions.
        if numFriends == 1:
            return word
        limit = len(word) - numFriends + 1
        return max(word[i : i + limit] for i in range(len(word)))
