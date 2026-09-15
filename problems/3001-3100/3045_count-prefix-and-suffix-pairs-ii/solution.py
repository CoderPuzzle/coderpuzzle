from typing import List


class Solution:
    def countPrefixSuffixPairs(self, words: List[str]) -> int:
        # Trie over paired characters (first+last, second+second-last, ...).
        # A node at depth d sits on word w's path exactly when the first d
        # and the last d characters of w coincide, so a word ending there is
        # both a prefix and a suffix of w.
        edges = {}
        counts = [0]
        total = 0
        for word in words:
            size = len(word)
            node = 0
            for j in range(size):
                key = node * 676 + ((ord(word[j]) - 97) * 26 + (ord(word[size - 1 - j]) - 97))
                nxt = edges.get(key)
                if nxt is None:
                    nxt = len(counts)
                    edges[key] = nxt
                    counts.append(0)
                node = nxt
                total += counts[node]
            counts[node] += 1
        # The answer can reach ~5 * 10^9 pairs, but Python ints do not
        # overflow.
        return total
