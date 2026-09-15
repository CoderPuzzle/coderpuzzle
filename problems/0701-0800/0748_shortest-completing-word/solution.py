from typing import List, Optional


class Solution:
    def shortestCompletingWord(self, licensePlate: str, words: List[str]) -> str:
        # The plate's demand: how many of each letter a word must supply.
        # ASCII puts every uppercase letter in 65..90 and its lowercase
        # twin 32 codes higher, so one range check + 32 folds the case;
        # digits and spaces match neither range and demand nothing.
        plate = [0] * 26
        for ch in licensePlate:
            code = ord(ch)
            if 65 <= code <= 90:
                code += 32
            if 97 <= code <= 122:
                plate[code - 97] += 1
        best = ""
        for word in words:
            # First-wins: only a strictly shorter word can displace the
            # best seen so far, so equal or longer words are skipped
            # without even counting their letters.
            if best and len(word) >= len(best):
                continue
            counts = [0] * 26
            for ch in word:
                counts[ord(ch) - 97] += 1
            # Covering: the word holds at least the plate's multiplicity
            # of every letter. Extra letters are free.
            if all(counts[i] >= plate[i] for i in range(26)):
                best = word
        # The statement guarantees a completing word exists, so best is
        # never empty on valid input.
        return best
