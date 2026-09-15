# Solutions — Finding 3-Digit Even Numbers

## Test every three-digit even candidate

Count the available copies of each digit, then iterate through the even integers from `100` to `998`. Extract each candidate's hundreds, tens, and ones digits, count the copies it needs, and append it exactly when every needed count is available. Iterating numerically produces unique answers in sorted order without a separate set or sort.

There are only 450 candidates and each uses three digits, so the running time is constant with respect to the input after its frequency table is built. The output contains at most those 450 values.

**Complexity:** `O(n + 450)` time and `O(1)` auxiliary space, excluding the output.
