# Solutions — Convert JSON String to Object

Both solutions read the text left to right and apply the same grammar —
a value is an object, an array, a string, a number, or one of the three
literals, and a container holds comma-separated values between its
brackets. What separates them is how much text the recursion ever sees.
One splits the work in two: a scanner first flattens the whole text into
a list of typed tokens, and a separate recursive parser consumes that
list without touching a character again — clean layers, bought with one
extra pass and one buffered token per character. The other fuses the
layers: a single cursor advances over the raw characters and the parser
calls itself the moment a container opens, so every character is read
exactly once and the only state beyond the cursor is the values being
built.

## Tokenize, Then Parse

The scanner is one loop over the text. Punctuation becomes a
one-character token, each quoted run becomes a string token sliced to
its closing quote, `true`, `false`, and `null` become literal tokens
committed by jumping the cursor four or five characters, and every run
of number characters becomes a single token converted by one `Number`
call. Each token carries its kind beside its value, and the kind is
what keeps a string shaped like `"{a:1}"` — a value — from ever being
confused with the punctuation around it.

The parser then is grammar without characters. A string, number, or
literal token already is the value it represents; an opening bracket
recurses — straight back out when the matching closer comes first, so
empty objects and arrays fall out without a special case, and otherwise
through a loop that consumes one separator token per iteration: a comma
means another pair or element follows, the closer means the container is
done. The validity guarantee is doing quiet work here — every closing
and separating token is exactly where the grammar says, so the loop
needs no lookahead past the token it consumes.

The layers cost a pass and a buffer: every character is scanned once to
become a token, then visited again by the parser, and the token list
itself is one entry per token in the input.

**Complexity:** `O(n)` time, `O(n)` space.

## Single-Pass Descent

The fused parser keeps one cursor over the text that every level of the
descent shares. `parseValue` looks at the character under the cursor:
`{` and `[` consume the bracket and recurse — returning immediately on
the matching closer for an empty container, and otherwise reading a key
(or an element) and then consuming separators until the closer arrives;
a quote hands off to the string scanner; `t`, `f`, and `n` commit to a
literal by jumping the cursor four or five characters; anything else
must begin a number, scanned as the run of characters that can appear
inside one and converted by one `Number` call.

Validity is what keeps every jump exact. A string cannot hold a quote,
so slicing to the next one is the whole scan; a number cannot hold a
character outside the digits, `-`, `+`, `.`, `e`, and `E`, so the run's
end is the value's end; and a literal's first letter cannot be anything
else, so the jump lands on the following token. Because the cursor only
moves forward and each value consumes exactly the characters it owns,
the parse is one pass: the work is the recursion itself, and the space
is the call stack — one frame per open bracket, the nesting depth.

**Complexity:** `O(n)` time, `O(d)` space, where `d` is the nesting
depth of the value.
