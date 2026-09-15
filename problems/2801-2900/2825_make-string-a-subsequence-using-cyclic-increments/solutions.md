# Solutions — Make String a Subsequence Using Cyclic Increments

## Two-pointer greedy scan

Let `n = str1.length` and `m = str2.length`. Each character of str1 can act
as itself or, under the one operation, as its cyclic successor — but only
positions that actually get used for a match matter; what happens to unused
indices is irrelevant. So the question reduces to whether str1 offers a
strictly increasing set of slots where slot i serves the next needed str2
character `c` whenever `str1[i] == c` or `str1[i] + 1 (mod 26) == c`.
Greedy is safe here: matching the current needed letter at the earliest
eligible slot never blocks anything later, since every position available
after a later pick is also available after the earliest one. That dominance
argument applies independently to each of str2's characters in order.

One pass settles it. Keep a pointer j into str2 and scan str1 left to
right; when `(str2[j] - str1[i] + 26) % 26 <= 1`, both characters agree
under some choice of increments, so advance j; otherwise skip `str1[i]`
entirely. The modulo fold makes 'z' behave like an ordinary predecessor of
'a' with no special case, and characters left untouched between claims cost
nothing because the operation permits arbitrarily many indices at once.
str2 is reachable exactly when j reaches m.

The scan visits each string once with constant extra state. Both lengths go
up to 10⁵, so the total work is about 2·10⁵ comparisons — comfortably
inside any limit, and every counter stays far below 32 bits.

**Complexity:** `O(n + m)` time, `O(1)` space.
