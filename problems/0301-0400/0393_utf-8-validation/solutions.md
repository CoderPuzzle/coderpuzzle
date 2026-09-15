# Solutions — UTF-8 Validation

## One pass with an owed-continuation counter

The encoding is a small state machine over one byte at a time: a leader byte
announces how many continuation bytes follow it, and each of those must start
with the bits 10. So a single counter — how many continuation bytes the
current leader is still owed — is all the state the pass needs. At zero the
byte must be a leader, and masking off its low bits reads off its class:
0xxxxxxx owes nothing, 110xxxxx owes one, 1110xxxx owes two, 11110xxx owes
three. Anything else sitting where a leader should be — a stray continuation
byte with no leader behind it, or the five-leading-ones shape 11111xxx that
no rule defines — rejects the input at once, as does any owed byte whose top
two bits are not 10.

Because the input is integers rather than bytes, each value is first masked
with 0xFF: only its least significant 8 bits are data, and the classification
reads exactly those. The counter then settles the two ways a sequence can end
badly without any wrong byte appearing: a leader cut short by the end of the
array still owes bytes, and a completed character followed by leftover
continuation bytes puts a non-leader where a leader belongs — the answer is
true only if the counter closes the input at exactly zero.

The scan holds nothing beyond the counter and the loop position, visits each
byte once, and stops at the first violation.

**Complexity:** `O(n)` time, `O(1)` space.
