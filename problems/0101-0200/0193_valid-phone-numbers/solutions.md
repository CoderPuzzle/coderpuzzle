# Solutions — Valid Phone Numbers

Four tools decide the same predicate over each line. The shell loop is
the procedural baseline and spells every literal character out. awk
matches whole records against a per-character pattern, sed against a
grouped extended one, and grep — one program, one pattern, nothing but
the match — closes the set.

## Read Line by Line

A `while IFS= read -r` loop hands each line to `case`, whose glob
alternation names the two allowed shapes character by character: digit
digit digit hyphen ... for the bare form, and a literal open
parenthesis, three digits, close parenthesis and space for the other.
No pattern metacharacters beyond the bracket classes, so the shells
own matcher is the whole solution.

It is the longest route and the clearest one about what a valid number
is — but the tool is doing work a pattern matcher one process earlier
already does.

**Complexity:** `O(total characters)` time, `O(one line)` space.

## awk Full-Line Match

awk applies its default action — print — to every record whose record
matches the anchored pattern, spelled per character for both shapes and
joined by `||`. One process reads and decides.

**Complexity:** `O(total characters)` time, `O(one line)` space.

## sed Address Filter

sed's native currency is line addresses, and `-E` lets the address be a
grouped extended pattern: `([0-9]{3}-){2}` names the repeated
three-digit-plus-hyphen run once, and the parenthesized shape is an
ordinary alternation branch. The `p` flag under `-n` prints exactly the
matching lines.

**Complexity:** `O(total characters)` time, `O(one line)` space.

## grep Extended Pattern

The whole task in one process: `grep -E` with an anchored alternation
naming the two shapes. No loop, no explicit print, no state — grep
streams the lines and keeps the ones that match.

**Complexity:** `O(total characters)` time, `O(one line)` space.
