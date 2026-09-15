# Solutions — Faulty Keyboard

## Keystroke-by-keystroke simulation

The faulty keyboard changes only what happens to the text already on the
screen, so typing can be replayed exactly as described. Keep one buffer of
characters; each typed letter appends to it, and each typed 'i' reverses the
whole buffer in place. Because a reversal touches everything written so far,
no auxiliary bookkeeping is needed — whatever the buffer holds after processing
a prefix of `s` is precisely the screen after those keystrokes.

An 'i' itself never lands on the screen, which matches both examples: every
reversal is applied before the following letters are appended, and trailing
reversals simply flip the accumulated text. The first character cannot be an
'i' per the constraints, but even consecutive 'i's behave correctly — they just
toggle the buffer twice.

With `n <= 100` this direct replay is more than fast enough. Each reversal
costs time proportional to the current buffer length, so inputs dense in 'i'
cost up to `O(n²)` character moves; no input-independent shortcut is required.

**Complexity:** `O(n²)` time, `O(n)` space.
