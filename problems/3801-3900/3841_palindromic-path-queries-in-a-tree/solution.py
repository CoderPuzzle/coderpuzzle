from typing import List


class Solution:
    def palindromePath(self, n: int, edges: List[List[int]], s: str, queries: List[str]) -> List[bool]:
        adjacency = [[] for _ in range(n)]
        for u, v in edges:
            adjacency[u].append(v)
            adjacency[v].append(u)

        # One iterative depth-first search from node 0 fills every static
        # structure: parent/depth, entry/exit stamps tin/tout over 2n tick
        # positions, and the Euler walk (node on entry and after every child)
        # that the sparse table compresses. The explicit stack keeps a 10^4
        # deep path off the call stack.
        depth = [0] * n
        tin = [0] * n
        tout = [0] * n
        first = [0] * n
        walk = [0] * (2 * n - 1)
        seen = [False] * n
        cursor = [0] * n
        clock = 0
        walk_length = 0
        seen[0] = True
        tin[0] = 0
        clock = 1
        first[0] = 0
        walk[0] = 0
        walk_length = 1
        stack = [0]
        while stack:
            node = stack[-1]
            neighbors = adjacency[node]
            if cursor[node] < len(neighbors):
                child = neighbors[cursor[node]]
                cursor[node] += 1
                if not seen[child]:
                    seen[child] = True
                    depth[child] = depth[node] + 1
                    tin[child] = clock
                    clock += 1
                    first[child] = walk_length
                    walk[walk_length] = child
                    walk_length += 1
                    stack.append(child)
            else:
                stack.pop()
                tout[node] = clock
                clock += 1
                if stack:
                    walk[walk_length] = stack[-1]
                    walk_length += 1

        # A letter can be rearranged into a palindrome exactly when at most
        # one letter occurs an odd number of times, so only the parities
        # matter. Encode node letters as 26-bit masks; XOR of masks along a
        # path leaves exactly the odd-count letters set. Path mask of u..v is
        # rootMask(u) ^ rootMask(v) ^ letter(lca), where rootMask(x) XORs the
        # letters from the root down to x: it appears in both root paths and
        # cancels, so it is XORed back in.
        #
        # rootMask(x) equals the XOR of every update delta whose node is an
        # ancestor-or-equal of x. On tick positions, the ancestors of x are
        # exactly the nodes y whose interval [tin[y], tout[y]] contains
        # tin[x], so flipping each node's delta at tin[y] and tout[y] + 1
        # makes rootMask(x) a plain prefix XOR up to tin[x]: every node whose
        # subtree ends before x contributes both flips (which cancel), and
        # every ancestor contributes only its opening flip. A Fenwick tree
        # over the 2n tick positions serves those prefix XOR reads and the
        # two point flips an update performs.
        size = 2 * n
        letters = list(s)
        delta_at = [0] * (size + 1)
        for node in range(n):
            bit = 1 << (ord(letters[node]) - 97)
            delta_at[tin[node] + 1] ^= bit
            closing = tout[node] + 2
            if closing <= size:
                delta_at[closing] ^= bit
        tree = [0] * (size + 1)
        prefix = [0] * (size + 1)
        running = 0
        for position in range(1, size + 1):
            running ^= delta_at[position]
            prefix[position] = running
        for position in range(1, size + 1):
            low = position & -position
            tree[position] = prefix[position] ^ prefix[position - low]

        # Sparse table over the Euler walk for constant-time lowest common
        # ancestors: pack (depth << 17) | node so a plain integer min picks
        # the shallowest node of any walk range, which is the LCA.
        walk_length = 2 * n - 1
        table = [[depth[node] << 17 | node for node in walk]]
        level = 1
        while (1 << level) <= walk_length:
            half = 1 << (level - 1)
            previous = table[level - 1]
            table.append([a if a <= b else b for a, b in zip(previous, previous[half:])])
            level += 1
        log2 = [0] * (walk_length + 1)
        for index in range(2, walk_length + 1):
            log2[index] = log2[index >> 1] + 1

        answer = []
        for query in queries:
            parts = query.split()
            if parts[0] == "update":
                node = int(parts[1])
                delta = (1 << (ord(letters[node]) - 97)) ^ (1 << (ord(parts[2]) - 97))
                if delta:
                    letters[node] = parts[2]
                    position = tin[node] + 1
                    while position <= size:
                        tree[position] ^= delta
                        position += position & -position
                    closing = tout[node] + 2
                    if closing <= size:
                        position = closing
                        while position <= size:
                            tree[position] ^= delta
                            position += position & -position
            else:
                u = int(parts[1])
                v = int(parts[2])
                left = first[u]
                right = first[v]
                if left > right:
                    left, right = right, left
                power = log2[right - left + 1]
                row = table[power]
                best = row[left]
                other = row[right - (1 << power) + 1]
                if other < best:
                    best = other
                top = best & 131071
                mask = 0
                position = tin[u] + 1
                while position:
                    mask ^= tree[position]
                    position -= position & -position
                position = tin[v] + 1
                while position:
                    mask ^= tree[position]
                    position -= position & -position
                mask ^= 1 << (ord(letters[top]) - 97)
                # At most one set bit <=> the mask is 0 or a power of two.
                answer.append(mask == 0 or mask & (mask - 1) == 0)
        return answer
