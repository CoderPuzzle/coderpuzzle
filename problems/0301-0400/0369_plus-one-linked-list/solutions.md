# Solutions — Plus One Linked List

## Increment the last non-9 digit

Adding one can only ever reach a single non-9 digit: the last digit changes, and while it is a 9 it rolls to 0 and pushes the carry one place further left, so the blast radius of the +1 is exactly the suffix of trailing 9s plus the first non-9 digit in front of them. Increment that digit and the carry dies there; every 9 behind it rolls over to 0. The whole problem therefore reduces to locating the last non-9 digit.

The walk that finds it prepends a 0 sentinel in front of the head. A single scan passes over every digit, parking a pointer on each non-9 it meets, so when the scan ends the pointer sits on the last non-9 digit; that node is incremented and the suffix behind it is zeroed. The sentinel is what dissolves the growth case into the ordinary one: when every digit is a 9, the last non-9 "digit" is the sentinel itself — it increments to a leading 1 while the entire original list zeroes out, and the answer is one node longer. Any other list leaves the sentinel at 0, and the head is returned with the list's length unchanged.

Everything happens by relabeling existing nodes: one digit incremented, the trailing 9s set to 0, and at most one sentinel node kept — and only in the all-9s case, where the answer genuinely has one more digit. Each node is read once and written at most once; nothing is copied and no second list is built.

**Complexity:** `O(n)` time, `O(1)` extra space.
