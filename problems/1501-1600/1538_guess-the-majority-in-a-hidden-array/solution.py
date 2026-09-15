from typing import List, Optional


class Solution:
    def guessMajority(self, arrayReader: ArrayReader) -> int:
        n = arrayReader.length()
        # Compare the fixed trio {0, 1, 2} against every later index.
        # The answer depends only on nums[i], so it takes exactly one of
        # two values across the whole array — every i lands in one of
        # two buckets, though which bucket means what is still unknown.
        results: List[tuple[int, int]] = []
        seen4 = False
        seen0 = False
        for i in range(3, n):
            r = arrayReader.query(0, 1, 2, i)
            results.append((i, r))
            if r == 4:
                seen4 = True
            elif r == 0:
                seen0 = True

        if seen4 or seen0:
            # A 4 means the trio is unanimous: it contributes 3 to the
            # bucket matching its own value and 0 to the other. A 0
            # (with no 4 seen) means the trio is a genuine 2-1 split:
            # the bucket answered 2 matches the trio's majority value
            # (contributing 2), the bucket answered 0 is the minority
            # (contributing 1).
            if seen4:
                match_result, anchor_match, anchor_diff = 4, 3, 0
                match_index: Optional[int] = 0
            else:
                match_result, anchor_match, anchor_diff = 2, 2, 1
                match_index = None
            diff_result = 2 if seen4 else 0

            count_match = sum(1 for _, r in results if r == match_result)
            count_diff = len(results) - count_match
            total_match = count_match + anchor_match
            total_diff = count_diff + anchor_diff

            if total_match == total_diff:
                return -1
            if total_match > total_diff:
                if match_index is not None:
                    return match_index
                for i, r in results:
                    if r == match_result:
                        return i
            else:
                for i, r in results:
                    if r == diff_result:
                        return i
            raise AssertionError("unreachable")

        # Every query answered 2: the per-index answer is injective, so
        # a constant answer forces a constant hidden value v for every
        # index from 3 onward (n >= 5 guarantees indices 3 and 4 both
        # exist). One more call pits the trio's first two entries
        # against that known-equal pair; combined with the 3-1 split
        # already seen at index 3, it pins down how many of the trio
        # equal v.
        v_index = 3
        r2 = arrayReader.query(0, 1, 3, 4)
        tail = n - 3
        if r2 == 4:
            # nums[0] == nums[1] == v, and the earlier 3-1 split forces
            # nums[2] to be the lone entry different from v.
            trio_matches_v = 2
            other_index = 2
        elif r2 == 0:
            # nums[0] == nums[1] == the value other than v; the 3-1
            # split then forces nums[2] to match them, not v.
            trio_matches_v = 0
            other_index = 0
        else:
            # Exactly one of nums[0], nums[1] equals v; the 3-1 split
            # forces nums[2] == v to reach a total of two trio members
            # matching v. The other value never wins this branch (its
            # count never exceeds 1 while v's count is at least n - 4),
            # so no index for it is ever needed.
            trio_matches_v = 2
            other_index = None

        count_v = tail + trio_matches_v
        count_other = 3 - trio_matches_v
        if count_v == count_other:
            return -1
        if count_v > count_other:
            return v_index
        return other_index
