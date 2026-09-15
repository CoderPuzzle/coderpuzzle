from typing import List


class Solution:
    def canAliceWin(self, a: List[str], b: List[str]) -> bool:
        # Legal moves depend only on the last played word: a word is a
        # legal reply when it is lexicographically greater and its first
        # letter equals the last word's first letter or the next one, and
        # every earlier play is <= that word, so words are never replayed.
        # Handing the opponent a larger threshold never helps them (their
        # reply options only shrink), so within one letter a player always
        # answers with their largest remaining word there, and a jump into
        # the next letter is played at that letter's largest word. After a
        # player spends their largest word of a letter they can never play
        # in that letter again, so the fight in each letter above the first
        # is one reply long: enter with your max, opponent answers with
        # theirs or exits upward, entrant exits upward or loses.
        #
        # Sweep letters top-down with enter[c] = "the player who enters
        # this letter with their largest word wins", then resolve Bob's
        # two options at the forced opener a[0]: answer inside the letter
        # or jump to the next letter at once.
        maxA = [None] * 26
        maxB = [None] * 26
        for w in a:
            maxA[ord(w[0]) - 97] = w
        for w in b:
            maxB[ord(w[0]) - 97] = w
        entA = [False] * 26
        entB = [False] * 26
        hasA = [False] * 26
        hasB = [False] * 26
        for c in range(26):
            hasA[c] = maxA[c] is not None
            hasB[c] = maxB[c] is not None
        for c in range(25, -1, -1):
            nxt = c + 1 if c < 25 else None
            if hasA[c]:
                bob_exit = nxt is not None and hasB[nxt] and entB[nxt]
                bob_stay = hasB[c] and maxB[c] > maxA[c] and not (nxt is not None and hasA[nxt] and entA[nxt])
                entA[c] = not (bob_exit or bob_stay)
            if hasB[c]:
                alice_exit = nxt is not None and hasA[nxt] and entA[nxt]
                alice_stay = hasA[c] and maxA[c] > maxB[c] and not (nxt is not None and hasB[nxt] and entB[nxt])
                entB[c] = not (alice_exit or alice_stay)
        c0 = ord(a[0][0]) - 97
        bob_exit = c0 < 25 and hasB[c0 + 1] and entB[c0 + 1]
        battle = False
        b1 = maxB[c0]
        if b1 is not None and b1 > a[0]:
            alice_exit = c0 < 25 and hasA[c0 + 1] and entA[c0 + 1]
            a1 = maxA[c0]
            a1_wins = a1 is not None and a1 > b1 and not bob_exit
            battle = not (a1_wins or alice_exit)
        return not (bob_exit or battle)
