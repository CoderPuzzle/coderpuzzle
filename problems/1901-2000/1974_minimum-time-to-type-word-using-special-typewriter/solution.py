class Solution:
    def minTimeToType(self, word: str) -> int:
        # The pointer sits on a 26-letter ring. Between two consecutive
        # letters there are only two arcs — clockwise and counterclockwise
        # — and the cheaper one is always optimal, because the cost to type
        # every future character does not depend on which arc was taken
        # (only the final position matters, which is the same either way).
        # Sum the cheaper arc for each letter, then add one second per
        # character for typing it.
        seconds = len(word)
        pos = 0  # pointer starts on 'a'
        for ch in word:
            target = ord(ch) - ord("a")
            diff = abs(target - pos)
            seconds += min(diff, 26 - diff)
            pos = target
        return seconds
