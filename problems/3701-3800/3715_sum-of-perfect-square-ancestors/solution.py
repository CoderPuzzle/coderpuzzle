from typing import List


class Solution:
    def sumOfAncestors(self, parent: List[int], nums: List[int]) -> int:
        n = len(parent)
        max_value = max(nums)

        # Smallest-prime-factor sieve up to the largest value present.
        spf = [0] * (max_value + 1)
        for i in range(2, max_value + 1):
            if spf[i] == 0:
                for j in range(i, max_value + 1, i):
                    if spf[j] == 0:
                        spf[j] = i

        # Square-free kernel: the product of primes dividing the value an
        # odd number of times. Two positive integers multiply to a perfect
        # square exactly when their kernels are equal.
        kernel = [1] * n
        for i in range(n):
            v = nums[i]
            while v > 1:
                p = spf[v]
                odd = False
                while v % p == 0:
                    v //= p
                    odd = not odd
                if odd:
                    kernel[i] *= p

        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        # Iterative depth-first walk; freq[k] counts ancestors on the
        # current root path whose kernel is k. Entering a node first adds
        # its matches, then records its own kernel; the node + n marker
        # undoes the record once the whole subtree is done, so the map
        # always describes exactly the current root-to-node path.
        freq = [0] * (max_value + 1)
        total = 0
        stack = [0]
        while stack:
            node = stack.pop()
            if node < n:
                total += freq[kernel[node]]
                freq[kernel[node]] += 1
                stack.append(node + n)
                stack.extend(children[node])
            else:
                freq[kernel[node - n]] -= 1
        return total
