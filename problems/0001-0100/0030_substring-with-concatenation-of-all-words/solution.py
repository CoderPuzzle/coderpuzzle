from collections import Counter
from typing import List


class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        word_length = len(words[0])
        # Required multiset of words; a window matches when its counts equal it.
        target = Counter(words)
        result: List[int] = []
        # One sliding window per alignment offset: a match can only start at a
        # position congruent to some r in 0..word_length-1 modulo word_length.
        for offset in range(word_length):
            window: Counter = Counter()
            count = 0  # Words currently inside the window.
            left = offset
            for right in range(offset, len(s) - word_length + 1, word_length):
                word = s[right : right + word_length]
                if word not in target:
                    # A non-word block can never appear in a match, so the
                    # window empties and resumes after it.
                    window.clear()
                    count = 0
                    left = right + word_length
                    continue
                window[word] += 1
                count += 1
                # Too many copies of word: release blocks from the left end
                # until the surplus is gone.
                while window[word] > target[word]:
                    window[s[left : left + word_length]] -= 1
                    count -= 1
                    left += word_length
                if count == len(words):
                    result.append(left)
                    # Release the leftmost block so the window can keep sliding
                    # toward the next (possibly adjacent) match.
                    window[s[left : left + word_length]] -= 1
                    count -= 1
                    left += word_length
        # Each offset emits ascending indices within its residue class; one
        # sort merges the classes into the pinned ascending order.
        result.sort()
        return result
