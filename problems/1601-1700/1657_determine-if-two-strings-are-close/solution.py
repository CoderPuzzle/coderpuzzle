class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        # Neither operation creates or destroys a letter: Operation 1 only
        # rearranges characters, and Operation 2 swaps the totals of two
        # existing letters. Two strings are therefore close exactly when
        # they occur over the same letter set with the same multiset of
        # frequencies — tallied into 26-slot count arrays, presence compared
        # slot by slot, then both arrays sorted and compared as lists.
        counts1 = [0] * 26
        counts2 = [0] * 26
        for c in word1:
            counts1[ord(c) - ord("a")] += 1
        for c in word2:
            counts2[ord(c) - ord("a")] += 1
        for a, b in zip(counts1, counts2):
            if (a > 0) != (b > 0):
                return False
        counts1.sort()
        counts2.sort()
        return counts1 == counts2
