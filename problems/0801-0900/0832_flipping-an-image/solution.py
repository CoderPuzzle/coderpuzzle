from typing import List


class Solution:
    def flipAndInvertImage(self, image: List[List[int]]) -> List[List[int]]:
        # Cell (i, j) of the answer is 1 - image[i][n - 1 - j]: the
        # reversal and the inversion fold into a single exchange, so one
        # two-pointer sweep per row writes row[left] ^ 1 and row[right] ^ 1
        # in one swap. XOR by 1 is the invert — 0 ^ 1 = 1, 1 ^ 1 = 0.
        n = len(image)
        for row in image:
            left, right = 0, n - 1
            while left < right:
                row[left], row[right] = row[right] ^ 1, row[left] ^ 1
                left += 1
                right -= 1
            # The middle cell of an odd-width row meets only itself in the
            # sweep, so it is inverted once, in place, afterwards.
            if n % 2 == 1:
                row[n // 2] ^= 1
        return image
