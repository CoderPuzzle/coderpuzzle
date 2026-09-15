# Solutions — Tag Validator

## One scan with a stack of open tags

A valid document is exactly one closed tag, so one left-to-right scan with a stack of open tag names decides it. Every `<` begins a construct: a start tag pushes its name, an end tag must repeat the name currently on top of the stack and pops it, and cdata is skipped whole. Any other character is ordinary content, legal only while at least one tag is open. The scan accepts when it reaches the end with the stack empty — every start tag then found its end tag, in the reverse order it was opened, which is precisely the balanced-nesting condition of rule 5.

Cdata is the one place parsing is forbidden. After `<![CDATA[` everything up to the first subsequent `]]>` is opaque, so an end tag, a stray `<`, or an invalid-looking name inside the shield counts as plain text, exactly as example 1 demands. The outermost tag carries what remains of the framing: it must open at the very first character and its end tag must be the very last, so anything seen while the stack is empty — leading text, a bare cdata, a second top-level tag, trailing junk after the outer `>` — is rejected on sight rather than by a special case per shape.

Tag names are read exactly as rule 6 dictates: everything from the character after `<` (or `</`) up to the next `>`, however long or strange, is the name — which is why the start tag of example 2 is `<DIV>` and not `<DIV>>`. A start-tag name must then pass the strict grammar, 1 to 9 upper-case letters, before it enters the stack, and that single gate is where digits, lower-case letters, the empty name, a length of ten, and a `/` all die. An end-tag name is not re-validated against the grammar; it must simply equal the name it pops, and a name that could never have been pushed can never equal one that was. A `<` with no subsequent `>` fails its `find` and the whole document with it.

**Complexity:** `O(n)` time, `O(depth)` space.
