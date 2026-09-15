class StringIterator:
    """A lazy single-segment cursor over the compressed string.

    The iterator never expands anything: it holds the current segment's
    letter, how many copies of it are still unspent, and a parse position.
    `next` spends one copy and re-parses the next letter-and-count only
    when the current one runs out; counts are read as 64-bit values since
    a single segment may repeat a letter 10⁹ times.
    """

    def __init__(self, compressedString: str) -> None:
        self.s: str = compressedString
        self.i = 0
        self.ch = " "
        self.count = 0

    def _advance(self) -> None:
        # Load the next segment: one letter, then its run of digits.
        if self.i < len(self.s):
            self.ch = self.s[self.i]
            self.i += 1
            start = self.i
            while self.i < len(self.s) and self.s[self.i].isdigit():
                self.i += 1
            self.count = int(self.s[start : self.i])

    def next(self) -> str:
        if self.count == 0:
            self._advance()
        if self.count == 0:
            # The parse position reached the end: exhausted for good.
            return " "
        self.count -= 1
        return self.ch

    def hasNext(self) -> bool:
        # More to give whenever the current count is positive or an
        # unparsed segment remains (every segment's count is at least 1).
        return self.count > 0 or self.i < len(self.s)
