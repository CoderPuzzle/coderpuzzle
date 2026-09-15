from typing import List


class Solution:
    def decode(self, encoded: List[int]) -> List[int]:
        # The chain perm[i + 1] = perm[i] ^ encoded[i] unrolls the whole
        # permutation from perm[0], which the permutation premise pins:
        # total = 1 ^ ... ^ n is known in advance, and XOR-ing the
        # odd-index encoded entries telescopes to perm[1] ^ ... ^
        # perm[n - 1] — covering every element but perm[0] exactly
        # because n is odd — so perm[0] = total ^ that.
        n = len(encoded) + 1
        total = 0
        for value in range(1, n + 1):
            total ^= value
        odd = 0
        for i in range(1, n - 1, 2):
            odd ^= encoded[i]
        perm = [total ^ odd]
        for value in encoded:
            perm.append(perm[-1] ^ value)
        return perm
