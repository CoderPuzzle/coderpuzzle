from typing import List, Optional


class Solution:
    def longestCommonPrefix(self, words: List[str], k: int) -> List[int]:
        n = len(words)
        # With one word gone there are fewer than k words, so no prefix survives.
        if n - 1 < k:
            return [0] * n

        total = sum(len(w) for w in words)
        cap = total + 1
        children = [-1] * (cap * 26)
        cnt = [0] * cap
        depth = [0] * cap
        nodes = 1
        # A trie node at depth d is a prefix of length d shared by cnt words.
        for w in words:
            cur = 0
            cnt[0] += 1
            for ch in w:
                c = ord(ch) - 97
                idx = cur * 26 + c
                if children[idx] == -1:
                    children[idx] = nodes
                    depth[nodes] = depth[cur] + 1
                    nodes += 1
                cur = children[idx]
                cnt[cur] += 1

        max_depth = max(len(w) for w in words)
        top1 = [-1] * (max_depth + 1)
        top2 = [-1] * (max_depth + 1)
        # Keep the two distinct nodes per depth with cnt >= k: if the removed
        # word's path covers the best one, the second is still off that path.
        for node in range(nodes):
            if cnt[node] >= k:
                d = depth[node]
                if top1[d] == -1:
                    top1[d] = node
                elif top2[d] == -1:
                    top2[d] = node
        depths = [d for d in range(max_depth, -1, -1) if top1[d] != -1]

        stamp = [0] * nodes
        ans = []
        for wi in range(n):
            w = words[wi]
            tag = wi + 1
            # A unique timestamp marks this word's trie path; old marks never match.
            stamp[0] = tag
            cur = 0
            big = 0
            # On-path node survives the removal only with cnt >= k + 1.
            for ch in w:
                cur = children[cur * 26 + (ord(ch) - 97)]
                stamp[cur] = tag
                if cnt[cur] >= k + 1 and depth[cur] > big:
                    big = depth[cur]
            fb = 0
            # Deepest off-path depth: top2 exists there, or top1 is off the path.
            for d in depths:
                if top2[d] != -1:
                    fb = d
                    break
                if stamp[top1[d]] != tag:
                    fb = d
                    break
            ans.append(big if big > fb else fb)
        return ans
