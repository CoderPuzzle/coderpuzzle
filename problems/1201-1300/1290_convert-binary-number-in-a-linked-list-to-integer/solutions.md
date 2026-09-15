# Solutions — Convert Binary Number in a Linked List to Integer

## Horner's rule in one pass

The binary number is already laid out most-significant-bit first, which
is exactly the order Horner evaluation wants: walking the list and, per
node, shifting the accumulator left one place and OR-ing the node's bit
builds `b0*2^(k-1) + b1*2^(k-2) + ... + b(k-1)` without ever materializing
the bits as a string or array. With at most 30 nodes the value fits
comfortably in an `int`.

**Complexity:** `O(n)` time over the list length `n`, `O(1)` space.
