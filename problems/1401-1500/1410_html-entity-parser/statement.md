# HTML Entity Parser

## Description

HTML entity parser is the parser that takes HTML code as input and
replace all the entities of the special characters by the characters
itself.

The special characters and their entities for HTML are:

- Quotation Mark: the entity is `&quot;` and symbol character is `"`.
- Single Quote Mark: the entity is `&apos;` and symbol character is `'`.
- Ampersand: the entity is `&amp;` and symbol character is `&`.
- Greater Than Sign: the entity is `&gt;` and symbol character is `>`.
- Less Than Sign: the entity is `&lt;` and symbol character is `<`.
- Slash: the entity is `&frasl;` and symbol character is `/`.

Given the input `text` string to the HTML parser, you have to implement
the entity parser.

Return the text after replacing the entities by the special characters.
Each entity is recognized at most once: the replacement is a single
left-to-right scan, so a `&` produced by a replacement (for example the
`&` that `&amp;` turns into) is never the start of a second replacement.

### Example 1

```text
Input: text = "&amp; is an HTML entity but &ambassador; is not."
Output: "& is an HTML entity but &ambassador; is not."
Explanation: The parser will replace the &amp; entity by &
```

### Example 2

```text
Input: text = "and I quote: &quot;...&quot;"
Output: "and I quote: \"...\""
```

### Constraints

- `1 <= text.length <= 10⁵`
- The string may contain any possible characters out of all the 256 ASCII
  characters.

## Hints

### Hint 1

Search the string for all the occurrences of the character `&`.

### Hint 2

For every `&` check if it matches an HTML entity by checking the `;`
character and if entity found replace it in the answer.
