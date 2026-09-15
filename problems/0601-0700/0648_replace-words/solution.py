from typing import List


class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        # One set holds every root, so a prefix test is a single hash
        # lookup. No root is longer than 100 letters, so a word longer
        # than that can stop its scan early — prefixes past the cap could
        # not equal any root anyway.
        roots = set(dictionary)
        # Each derivative is replaced by its shortest matching root, and
        # the scan tries prefixes shortest first, so the first hit is the
        # answer; a word no root prefixes keeps itself.
        replaced = []
        for word in sentence.split(" "):
            replacement = word
            for length in range(1, min(len(word), 100) + 1):
                prefix = word[:length]
                if prefix in roots:
                    replacement = prefix
                    break
            replaced.append(replacement)
        return " ".join(replaced)
