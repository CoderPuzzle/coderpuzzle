from typing import List


class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        word_set = set(wordList)
        # No sequence can end outside the dictionary.
        if endWord not in word_set:
            return 0
        length = len(beginWord)

        # Bucket every word under each wildcard pattern ("hot" -> "*ot",
        # "h*t", "ho*"): all one-letter neighbors share one of its patterns.
        buckets = {}
        for word in wordList:
            for i in range(length):
                buckets.setdefault(word[:i] + "*" + word[i + 1 :], []).append(word)

        # Level-order BFS; steps starts at 1 because beginWord itself counts.
        visited = {beginWord}
        queue = [beginWord]
        steps = 1
        while queue:
            nxt = []
            for word in queue:
                if word == endWord:
                    return steps
                for i in range(length):
                    # Pop the bucket so it is read once overall and can never
                    # be re-read via a same-level word sharing the pattern.
                    for neighbor in buckets.pop(word[:i] + "*" + word[i + 1 :], []):
                        if neighbor not in visited:
                            # Each word is enqueued at most once.
                            visited.add(neighbor)
                            nxt.append(neighbor)
            queue = nxt
            steps += 1
        return 0
