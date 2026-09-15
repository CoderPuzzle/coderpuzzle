class ArrayReader;

class Solution {
  public:
    int guessMajority(ArrayReader &arrayReader) {
        int n = arrayReader.length();
        // Compare the fixed trio {0, 1, 2} against every later index.
        // The answer depends only on nums[i], so it takes exactly one
        // of two values across the whole array — every i lands in one
        // of two buckets, though which bucket means what is still
        // unknown.
        std::vector<std::pair<int, int>> results;
        bool seen4 = false;
        bool seen0 = false;
        for (int i = 3; i < n; ++i) {
            int r = arrayReader.query(0, 1, 2, i);
            results.emplace_back(i, r);
            if (r == 4) {
                seen4 = true;
            } else if (r == 0) {
                seen0 = true;
            }
        }

        if (seen4 || seen0) {
            // A 4 means the trio is unanimous: it contributes 3 to the
            // bucket matching its own value and 0 to the other. A 0
            // (with no 4 seen) means the trio is a genuine 2-1 split:
            // the bucket answered 2 matches the trio's majority value
            // (contributing 2), the bucket answered 0 is the minority
            // (contributing 1).
            int matchResult = seen4 ? 4 : 2;
            int anchorMatch = seen4 ? 3 : 2;
            int anchorDiff = seen4 ? 0 : 1;
            int diffResult = seen4 ? 2 : 0;
            bool haveMatchIndex = seen4;
            int matchIndex = 0;

            int countMatch = 0;
            for (const auto &entry : results) {
                if (entry.second == matchResult)
                    ++countMatch;
            }
            int countDiff = static_cast<int>(results.size()) - countMatch;
            int totalMatch = countMatch + anchorMatch;
            int totalDiff = countDiff + anchorDiff;

            if (totalMatch == totalDiff)
                return -1;
            if (totalMatch > totalDiff) {
                if (haveMatchIndex)
                    return matchIndex;
                for (const auto &entry : results) {
                    if (entry.second == matchResult)
                        return entry.first;
                }
            } else {
                for (const auto &entry : results) {
                    if (entry.second == diffResult)
                        return entry.first;
                }
            }
            throw std::runtime_error("unreachable");
        }

        // Every query answered 2: the per-index answer is injective, so
        // a constant answer forces a constant hidden value v for every
        // index from 3 onward (n >= 5 guarantees indices 3 and 4 both
        // exist). One more call pits the trio's first two entries
        // against that known-equal pair; combined with the 3-1 split
        // already seen at index 3, it pins down how many of the trio
        // equal v.
        int vIndex = 3;
        int r2 = arrayReader.query(0, 1, 3, 4);
        int tail = n - 3;
        int trioMatchesV;
        int otherIndex;
        if (r2 == 4) {
            // nums[0] == nums[1] == v, and the earlier 3-1 split forces
            // nums[2] to be the lone entry different from v.
            trioMatchesV = 2;
            otherIndex = 2;
        } else if (r2 == 0) {
            // nums[0] == nums[1] == the value other than v; the 3-1
            // split then forces nums[2] to match them, not v.
            trioMatchesV = 0;
            otherIndex = 0;
        } else {
            // Exactly one of nums[0], nums[1] equals v; the 3-1 split
            // forces nums[2] == v to reach a total of two trio members
            // matching v. The other value never wins this branch (its
            // count never exceeds 1 while v's count is at least n - 4),
            // so no index for it is ever needed.
            trioMatchesV = 2;
            otherIndex = -1;
        }

        int countV = tail + trioMatchesV;
        int countOther = 3 - trioMatchesV;
        if (countV == countOther)
            return -1;
        if (countV > countOther)
            return vIndex;
        return otherIndex;
    }
};
