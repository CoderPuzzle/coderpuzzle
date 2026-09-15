from typing import List


class Solution:
    def wordsAbbreviation(self, words: List[str]) -> List[str]:
        # Every word starts at a one-letter prefix: first character, count of
        # the middle, last character. Abbreviations can only clash between
        # equal-length words sharing that prefix and their last letter, and
        # the cure is collective — every clashing group grows its prefix by
        # one and re-groups, until each abbreviation stands alone.
        prefix = [1] * len(words)

        def abbreviation(i: int) -> str:
            word = words[i]
            p = prefix[i]
            return word[:p] + str(len(word) - p - 1) + word[-1]

        while True:
            groups = {}
            for i in range(len(words)):
                groups.setdefault(abbreviation(i), []).append(i)
            clashing = [ids for ids in groups.values() if len(ids) > 1]
            if not clashing:
                break
            for ids in clashing:
                for i in ids:
                    prefix[i] += 1

        result: List[str] = []
        for i in range(len(words)):
            abbr = abbreviation(i)
            # An abbreviation no shorter than the word itself buys nothing.
            result.append(abbr if len(abbr) < len(words[i]) else words[i])
        return result
