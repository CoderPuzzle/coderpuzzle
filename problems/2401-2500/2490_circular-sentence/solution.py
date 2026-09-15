from typing import List, Optional


class Solution:
    def isCircularSentence(self, sentence: str) -> bool:
        # A sentence is circular exactly when every space joins a matching
        # last-to-first pair and the endpoints wrap: sentence[0] is the
        # first character of the first word and sentence[-1] the last
        # character of the last word. Bail out at the first broken junction.
        for i, c in enumerate(sentence):
            if c == " " and sentence[i - 1] != sentence[i + 1]:
                return False
        return sentence[0] == sentence[-1]
