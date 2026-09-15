from typing import List, Optional


class Solution:
    def findNumOfValidWords(self, words: List[str], puzzles: List[str]) -> List[int]:
        def word_mask(text):
            # a word is fully described by its 26-bit distinct-letter mask;
            # repeats within the word are irrelevant to validity
            m = 0
            for ch in text:
                m |= 1 << (ord(ch) - 97)
            return m

        # bucket words by mask once so each puzzle avoids scanning all words
        counts = {}
        for w in words:
            m = word_mask(w)
            counts[m] = counts.get(m, 0) + 1

        answer = []
        for puzzle in puzzles:
            # a valid word mask must contain the puzzle's first letter
            first = 1 << (ord(puzzle[0]) - 97)
            puzzle_mask = word_mask(puzzle)
            total = 0
            # enumerate every submask of the 7-letter puzzle mask (at most
            # 127); sub = (sub - 1) & puzzle_mask walks them all in order
            sub = puzzle_mask
            while sub:
                if sub & first:
                    total += counts.get(sub, 0)
                sub = (sub - 1) & puzzle_mask
            answer.append(total)
        return answer
