class Solution:
    def eventualSafeNodes(self, graph: list[list[int]]) -> list[int]:
        n = len(graph)
        # Memoized DFS on the graph as given: ask each node directly whether
        # every walk from it terminates, and cache the verdict. The stack is
        # explicit, so a 10^4-deep chain cannot overflow recursion.
        UNVISITED, VISITING, SAFE, UNSAFE = 0, 1, 2, 3
        state = [UNVISITED] * n
        # Per-node scratch for the active frame; a node sits on the stack at
        # most once, so node indexing works for the cursor and the flag.
        nxt = [0] * n
        unsafe_child = [False] * n
        for start in range(n):
            if state[start] != UNVISITED:
                continue  # verdict already memoized by an earlier start
            state[start] = VISITING
            stack = [start]
            while stack:
                u = stack[-1]
                if nxt[u] < len(graph[u]):
                    v = graph[u][nxt[u]]
                    nxt[u] += 1
                    if state[v] == VISITING:
                        # Back edge onto the current path: a cycle runs
                        # through it, so this successor is never safe.
                        unsafe_child[u] = True
                    elif state[v] == UNVISITED:
                        state[v] = VISITING
                        stack.append(v)
                    elif state[v] == UNSAFE:
                        # Memoized danger feeds straight back.
                        unsafe_child[u] = True
                    # A SAFE successor clears the bar on its own.
                else:
                    stack.pop()
                    state[u] = UNSAFE if unsafe_child[u] else SAFE
                    if unsafe_child[u] and stack:
                        # Danger propagates up: the node below reached this one.
                        unsafe_child[stack[-1]] = True
        # The ascending scan yields the required sorted order.
        return [i for i in range(n) if state[i] == SAFE]
