from typing import List


class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        # Greedy packing: the current line keeps accepting words while its
        # letters plus one joining space per gap still fit in maxWidth; the
        # first word that would overflow opens a new line.
        lines: List[List[str]] = []
        current: List[str] = []
        letters = 0
        for word in words:
            if current and letters + len(word) + len(current) > maxWidth:
                lines.append(current)
                current = []
                letters = 0
            current.append(word)
            letters += len(word)
        lines.append(current)

        last = len(lines) - 1
        justified: List[str] = []
        for index, line in enumerate(lines):
            # The last line, and any line holding a single word, is
            # left-justified: single spaces, padding all on the tail.
            if index == last or len(line) == 1:
                justified.append(" ".join(line).ljust(maxWidth))
                continue
            letters = sum(len(word) for word in line)
            gaps = len(line) - 1
            base, extra = divmod(maxWidth - letters, gaps)
            pieces: List[str] = []
            for gap, word in enumerate(line[:-1]):
                # Every gap gets `base` spaces and the leftmost `extra` gaps
                # one more, so left slots are never narrower than right ones.
                pieces.append(word)
                pieces.append(" " * (base + (1 if gap < extra else 0)))
            pieces.append(line[-1])
            justified.append("".join(pieces))
        return justified
