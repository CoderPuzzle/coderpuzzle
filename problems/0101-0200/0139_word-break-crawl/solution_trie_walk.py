from typing import List


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Trie over the wordDict: nested dicts keyed by letter, with "$"
        # marking a node where a word ends. From every reachable position a
        # walk follows s's own characters, so a branch dies at the first
        # character no remaining word shares, and each terminal crossed
        # marks the prefix after it reachable.
        root = {}
        for word in wordDict:
            node = root
            for ch in word:
                node = node.setdefault(ch, {})
            node["$"] = True
        n = len(s)
        reachable = [False] * (n + 1)
        reachable[0] = True
        for i in range(n):
            if not reachable[i]:
                continue
            node = root
            j = i
            while j < n and s[j] in node:
                node = node[s[j]]
                j += 1
                # Every terminal on the path ends a word at this depth.
                if "$" in node:
                    reachable[j] = True
        return reachable[n]
