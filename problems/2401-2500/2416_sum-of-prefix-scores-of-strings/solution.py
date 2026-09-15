from typing import List, Optional


class Solution:
    def sumPrefixScores(self, words: List[str]) -> List[int]:
        # one shared trie: a node's "#" counter equals the score of its prefix
        root = {}
        for word in words:
            node = root
            for ch in word:
                # nested dicts as nodes; "#" holds the counter, no node class
                node = node.setdefault(ch, {})
                # count at every depth so the full word scores its own prefixes
                node["#"] = node.get("#", 0) + 1
        scores = []
        # second pass: a word's answer is the sum of counters along its path
        for word in words:
            node = root
            total = 0
            for ch in word:
                node = node[ch]
                # this node's counter is exactly the score of the prefix so far
                total += node["#"]
            scores.append(total)
        return scores
