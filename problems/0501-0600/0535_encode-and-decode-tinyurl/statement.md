# Encode and Decode TinyURL

## Description

Note: This is a companion problem to the System Design problem: Design TinyURL.

TinyURL is a URL shortening service where you enter a URL such as
https://leetcode.com/problems/design-tinyurl and it returns a short URL such as
http://tinyurl.com/4e9iAk. Design a class to encode a URL and decode a tiny URL.

There is no restriction on how your encode/decode algorithm should work. You just
need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be
decoded to the original URL.

Implement the `Codec` class:

- `Codec()` Initializes the object of the system.
- `String encode(String longUrl)` Returns a tiny URL for the given longUrl.
- `String decode(String shortUrl)` Returns the original long URL for the given
  shortUrl. It is guaranteed that the given shortUrl was encoded by the same
  object.

For a deterministic answer, encode appends the URL to a per-object list and
returns `http://tinyurl.com/` followed by the URL's 1-based position in that
list, written in lowercase base-36 digits (`0`–`9`, then `a`–`z`, most
significant digit first, no padding): each object starts its list empty, so its
first encode returns `http://tinyurl.com/1`, its tenth `http://tinyurl.com/a`,
its 35th `http://tinyurl.com/z`, and its 36th `http://tinyurl.com/10`. Encoding
the same URL again appends another entry and spends the next position — encode
does not dedupe. The original problem accepts any self-consistent codec — only
the round trip is checked — which exact judging cannot express, so this one
scheme is pinned here as the deterministic-answer device. Both methods are judged
against it exactly: `encode` must return precisely this URL, and `decode` always
receives a string the same object previously returned.

### Example 1

```text
Input:
["Codec", "encode", "decode"]
[[], ["https://leetcode.com/problems/design-tinyurl"], ["http://tinyurl.com/1"]]
Output: [null, "http://tinyurl.com/1", "https://leetcode.com/problems/design-tinyurl"]
Explanation:
Codec codec = new Codec();
string tiny = codec.encode(url); // returns the encoded tiny url.
string ans = codec.decode(tiny); // returns the original url after decoding it.
```

### Constraints

- `1 <= url.length <= 10⁴`
- `url` is guranteed to be a valid URL.
