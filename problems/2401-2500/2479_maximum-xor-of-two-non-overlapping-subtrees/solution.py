from typing import List, Optional


class _Trie:
    def __init__(self, bits):
        self.bits = bits
        # flat node store; node 0 is the root, -1 marks a missing child
        self.children = [[-1, -1]]

    def _new_node(self):
        self.children.append([-1, -1])
        return len(self.children) - 1

    def insert(self, value):
        node = 0
        for b in range(self.bits - 1, -1, -1):
            bit = (value >> b) & 1
            nxt = self.children[node][bit]
            if nxt == -1:
                nxt = self._new_node()
                self.children[node][bit] = nxt
            node = nxt

    def query(self, value):
        node = 0
        result = 0
        for b in range(self.bits - 1, -1, -1):
            bit = (value >> b) & 1
            want = 1 - bit
            kids = self.children[node]
            if kids[want] != -1:
                result |= 1 << b
                node = kids[want]
            else:
                node = kids[bit]
            if node == -1:
                return result
        return result


class Solution:
    def maxXor(self, n: int, edges: List[List[int]], values: List[int]) -> int:
        graph = [[] for _ in range(n)]
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)

        # iterative DFS to get an Euler order and parents
        parent = [-1] * n
        order = []
        visited = [False] * n
        visited[0] = True
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            for v in graph[u]:
                if not visited[v]:
                    visited[v] = True
                    parent[v] = u
                    stack.append(v)

        # subtree sums by accumulating in reverse order
        subtree_sum = list(values)
        for u in reversed(order):
            p = parent[u]
            if p != -1:
                subtree_sum[p] += subtree_sum[u]

        max_sum = max(subtree_sum)
        bits = max(1, max_sum.bit_length())
        trie = _Trie(bits)

        # A node is inserted into the trie only after its whole subtree has been
        # processed. When a node u is first visited, the trie therefore holds only
        # sums of already-completed subtrees that are disjoint from u's subtree
        # (never ancestors, never descendants).
        answer = trie.query(subtree_sum[0])

        ptr = [0] * n
        stk = [0]
        par = [-1]
        while stk:
            u = stk[-1]
            p = par[-1]
            if ptr[u] < len(graph[u]):
                v = graph[u][ptr[u]]
                ptr[u] += 1
                if v != p:
                    best = trie.query(subtree_sum[v])
                    if best > answer:
                        answer = best
                    stk.append(v)
                    par.append(u)
            else:
                stk.pop()
                par.pop()
                trie.insert(subtree_sum[u])
        return answer
