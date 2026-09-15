# Solutions — Unique Email Addresses

Two rewriting rules, both confined to the local name, decide which addresses
coincide: dots there vanish, and everything from the first '+' onward is
ignored — while the domain is copied verbatim. So the whole problem is one
normalization per address followed by a count of the distinct survivors,
which a hash set answers as it goes.

## One Scan, One Hash Set

Each address is normalized in a single left-to-right pass with a latch. The
scan walks characters while building the cleaned local name: a '.' is
skipped, a '+' flips the latch and is not emitted, and any later character
— dots included — is dropped because it sits in the filtered tail. The one
'@' ends this regime: the domain is appended untouched from that index to
the end, and the assembled string goes into the set. Nothing is split in
advance and no rule is applied to the domain, so dots there keep addresses
such as `lee.tcode.com` and `leetcode.com` distinct.

The order trap is the reason the latch, not two independent cleanups, does
the work: a dot after the '+' must not be removed, it must disappear with
the tail it lives in. Since every address is visited once and each
character is examined once, the pass is linear in the input's total length;
the answer is the set's size when the sweep ends.

**Complexity:** `O(C)` time, `O(C)` space.
