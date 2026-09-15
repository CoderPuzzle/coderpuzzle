# Encode and Decode Strings

## Description

Design an algorithm to encode a list of strings to a string. The encoded string
is then sent over the network and is decoded back to the original list of
strings.

Machine 1 (sender) has the function:

```text
string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}
```

Machine 2 (receiver) has the function:

```text
vector<string> decode(string s) {
  // ... your code
  return strs;
}
```

So Machine 1 does:

```text
string encoded_string = encode(strs);
```

and Machine 2 does:

```text
vector<string> strs2 = decode(encoded_string);
```

`strs2` in Machine 2 should be the same as `strs` in Machine 1.

Implement the `Codec` class:

- `String encode(String[] strs)` Encodes a list of strings to a single string.
- `String[] decode(String s)` Decodes that single string back into the original
  list of strings.

You are not allowed to solve the problem using any serialize methods (such as
`eval`).

For a deterministic answer, encode each string as its decimal length, a colon
`:`, then the string itself, and concatenate the pieces in order:
`encode(["Hello", "World"])` is `"5:Hello5:World"`, and `encode([""])` is
`"0:"`. The original problem accepts any self-consistent encoding — only the
round trip is checked — which exact judging cannot express, so this one format
is pinned here as the deterministic-answer device. Both methods are judged
against it exactly: `encode` must return precisely this encoding, and `decode`
always receives a string already in it.

### Example 1

```text
Input:
["Codec", "encode", "decode"]
[[], [["Hello", "World"]], ["5:Hello5:World"]]
Output: [null, "5:Hello5:World", ["Hello", "World"]]
Explanation:
Machine 1:
Codec encoder = new Codec();
String msg = encoder.encode(strs);
Machine 1 ---msg---> Machine 2

Machine 2:
Codec decoder = new Codec();
String[] strs = decoder.decode(msg);
```

### Example 2

```text
Input:
["Codec", "encode", "decode"]
[[], [[""]], ["0:"]]
Output: [null, "0:", [""]]
```

### Constraints

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` contains any possible characters out of 256 valid ASCII
  characters.

### Follow-up

Could you write a generalized algorithm to work on any possible set of
characters?
