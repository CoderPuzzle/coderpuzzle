# Solutions — Encrypt and Decrypt Strings

## Encrypt forward on demand; pre-encrypt the dictionary for decrypt

Encryption is a simple per-character table lookup, so `encrypt` walks word1
and concatenates each character's 2-character mapping, returning "" the
moment a character is missing from keys.

Decryption is where the leverage lives. A brute-force decryption of word2
branches into up to 26 candidates per block and then filters against the
dictionary — but every dictionary word can be encrypted once at construction
time, and encryption is deterministic. So the constructor stores a bag of
`encrypt(dictionary[i])` counts, and each `decrypt(word2)` call answers with
a single hash lookup: the number of dictionary strings whose encryption
equals word2. This is exactly the decrypt count, because dictionary words
that collide under encryption are precisely the multiple strings word2 can
decrypt to, and the guarantee that all `dictionary[i]` are unique keeps the
bag counting distinct originals.

Construction costs `O(total dictionary length)`; each call costs
`O(len(word))`. With at most 200 calls this dominates the branchy trie-free
alternative while using the same asymptotic space as storing the dictionary.

**Complexity:** `O(D)` construction (`D` = total dictionary length),
`O(len(word))` per call, `O(D)` space.
