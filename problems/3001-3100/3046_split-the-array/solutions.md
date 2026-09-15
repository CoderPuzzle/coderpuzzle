# Solutions — Split the Array

## Count frequencies

The two halves must each be distinct, so across both halves a value can fill
at most two slots: three or more copies of one value force two equal copies
into the same half by pigeonhole. Conversely, when every value occurs at most
twice, give one copy of each doubled value to each half; the singly occurring
values left over are even in number (the array length is even), so they split
evenly between the halves too.

So the answer is `true` exactly when every value's frequency is at most `2`.
The code counts occurrences in one pass over `nums` and returns `false` as
soon as a third copy of some value appears.

**Complexity:** `O(n)` time, `O(n)` space.
