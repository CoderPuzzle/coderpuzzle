class SparseVector:
    """A sparse vector keeps only its nonzero (index, value) pairs — the
    indices arrive in increasing order by construction — so a vector of
    length 10^5 with three nonzero entries stores three pairs. The dot
    product then merges the two sorted pair lists with two cursors:
    equal indices contribute one product and advance both cursors, a
    smaller index advances alone because its partner there is zero. The
    bound 10^5 * 100 * 100 = 10^9 still fits a 32-bit integer.
    """

    def __init__(self, nums: List[int]):
        self.pairs = [(index, value) for index, value in enumerate(nums) if value != 0]

    def dotProduct(self, vec: SparseVector) -> int:
        total = 0
        left = 0
        right = 0
        while left < len(self.pairs) and right < len(vec.pairs):
            index_a, value_a = self.pairs[left]
            index_b, value_b = vec.pairs[right]
            if index_a == index_b:
                total += value_a * value_b
                left += 1
                right += 1
            elif index_a < index_b:
                left += 1
            else:
                right += 1
        return total
