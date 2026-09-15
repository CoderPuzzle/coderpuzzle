# Solutions — Reverse String

## Two pointers from both ends

Reversal is a pairwise job: the element at position `i` belongs at position
`n - 1 - i`, and no element needs to travel further than that. So two
indexes — `lo` starting at `0` and `hi` starting at `n - 1` — walk inward
one step at a time, swapping the pair they currently form. Each swap puts
two elements in their final places, the loop stops the moment the indexes
meet, and `n / 2` swaps later the array reads backwards.

The swap never touches the characters themselves, only where the array
slots point: trading two references (a pointer trade in C++'s `std::swap`,
a tuple assignment in Python, a move in Rust's `Vec::swap`) is constant
work that allocates nothing and copies no string. That is what keeps the
solution inside the statement's `O(1)` extra memory bound — the reversal
happens entirely inside the given array. The loop condition `lo < hi`
already handles the edges: a single-character array never enters the loop,
an odd-length array's middle element swaps with no one and simply stays,
and on a palindrome like `["r","a","c","e","c","a","r"]` every swap
exchanges equal characters, so the output equals the input.

The in-place mutation is the answer here — the judge reads only the return
value, so the method hands back the same array it just reversed.

**Complexity:** `O(n)` time, `O(1)` space.
