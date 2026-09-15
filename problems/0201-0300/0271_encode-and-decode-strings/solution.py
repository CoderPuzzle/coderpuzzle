from typing import List


class Codec:
    """Length-prefixed chunks: each string travels as its decimal length,
    a colon, then the string itself, concatenated in order.

    The prefix says exactly how many characters belong to the piece, so
    no colon or digit inside a string can be mistaken for structure —
    `decode` never guesses where a piece ends.
    """

    def encode(self, strs: List[str]) -> str:
        return "".join(f"{len(word)}:{word}" for word in strs)

    def decode(self, s: str) -> List[str]:
        words: List[str] = []
        position = 0
        while position < len(s):
            colon = s.index(":", position)
            length = int(s[position:colon])
            words.append(s[colon + 1 : colon + 1 + length])
            position = colon + 1 + length
        return words
