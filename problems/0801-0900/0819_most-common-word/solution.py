from typing import List, Optional


class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        banned_set = set(banned)
        counts = {}
        best_word = ""
        best_count = 0
        # The trailing space closes a word still open when the paragraph
        # ends, so the loop never needs a separate flush.
        word = []
        for ch in paragraph + " ":
            code = ord(ch)
            # ASCII puts every uppercase letter 32 codes above its
            # lowercase twin, so one range check + 32 folds the case;
            # every other character matches neither range and cuts the
            # word instead of joining it.
            if 65 <= code <= 90:
                word.append(chr(code + 32))
            elif 97 <= code <= 122:
                word.append(ch)
            elif word:
                end = "".join(word)
                word = []
                if end not in banned_set:
                    count = counts.get(end, 0) + 1
                    counts[end] = count
                    # Strictly greater keeps the earlier word on equal
                    # counts; the statement guarantees the answer is
                    # unique, so no tie ever reaches this comparison.
                    if count > best_count:
                        best_count = count
                        best_word = end
        return best_word
