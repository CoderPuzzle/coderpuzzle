# Solutions — Check if Binary String Has at Most One Segment of Ones

A segment of ones is a maximal run of '1' characters, so the string
qualifies exactly when a second such run never gets started.

## Count segments in one scan

Walk the string once and count maximal runs of ones: a run starts at
any '1' that is either the first character or preceded by a '0'. The
answer is true precisely when that count never exceeds one, so the scan
can bail out the moment a second run begins. Since `s[0] == '1'`
guarantees a first segment, the whole question reduces to whether the
pattern '0' followed by '1' ever occurs anywhere in `s`.

On `"1001"` a second run starts at the final character, so the answer
is false; on `"110"` the lone run `"11"` is never followed by another
'1', so the answer is true.

**Complexity:** `O(n)` time, `O(1)` space.
