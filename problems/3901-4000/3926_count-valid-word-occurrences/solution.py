from typing import List


class Solution:
    def countWordOccurrences(self, chunks: List[str], queries: List[str]) -> List[int]:
        text = "".join(chunks)
        counts = {}
        current = []

        def flush() -> None:
            if current:
                word = "".join(current)
                counts[word] = counts.get(word, 0) + 1
                current.clear()

        for i, char in enumerate(text):
            if char == "-":
                if i > 0 and i + 1 < len(text) and text[i - 1].islower() and text[i + 1].islower():
                    current.append(char)
                else:
                    flush()
            elif char == " ":
                flush()
            else:
                current.append(char)
        flush()

        return [counts.get(query, 0) for query in queries]
