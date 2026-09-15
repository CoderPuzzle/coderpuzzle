from typing import List


class Solution:
    def wordsTyping(self, sentence: List[str], rows: int, cols: int) -> int:
        n = len(sentence)
        lengths = [len(word) for word in sentence]
        # One sentence "packet": every word plus its trailing space.
        packet = sum(lengths) + n
        next_start: List[int] = [-1] * n
        row_words: List[int] = [0] * n
        total = 0
        start = 0
        for _ in range(rows):
            if next_start[start] < 0:
                # A row's fill depends only on the word it starts from, so
                # memoize (next start, words placed) per start index.
                used = 0
                placed = 0
                j = start
                # Finish the in-progress sentence pass, reaching word 0.
                while j < n and used + lengths[j] <= cols:
                    used += lengths[j] + 1
                    placed += 1
                    j += 1
                if j == n:
                    j = 0
                    if used <= cols:
                        # Aligned at word 0: whole packets fit wholesale,
                        # (cols - used) // packet of them, in one step.
                        full = (cols - used) // packet
                        placed += full * n
                        used += full * packet
                    # A sub-packet remainder: fewer than `packet` columns
                    # left, so at most n more words, one by one.
                    while j < n and used + lengths[j] <= cols:
                        used += lengths[j] + 1
                        placed += 1
                        j += 1
                    if j == n:
                        j = 0
                next_start[start] = j
                row_words[start] = placed
            total += row_words[start]
            start = next_start[start]
        # Every n consecutive words placed completes the sentence once.
        return total // n
