# Solutions — Sum of Prefix Scores of Strings

## Trie with prefix counters

The score of a prefix `p` is the number of words in the list that have `p` as a prefix, and `answer[i]` sums those scores over every non-empty prefix of `words[i]`. All these prefixes live on the paths of a single trie shared by all words: build it once, and let each node carry a counter of how many insertions passed through it — by construction, exactly the score of the prefix that node represents.

![With words = ["abc","ab","bc","b"], the trie's counter badges hold each prefix's score and walking each word again sums them along its path — abc 2+2+1 = 5, ab 2+2 = 4, bc 2+1 = 3, b 2 — for the answers [5,4,3,2].](figures/solution-trie-counter-walks.svg)

The trie is implemented with nested dictionaries, using the marker key `"#"` for the counter, which avoids a node class and fixed alphabet arrays. Insertion walks a word character by character, creating children with `setdefault` and incrementing the counter at every step (a prefix must be counted for the full word too, including the word itself). A second pass then walks each word again, summing the counters along its root-to-node path; that sum is precisely the sum of scores of the word's prefixes.

Both passes touch each character exactly once, so the total work and the trie's size are proportional to `S`, the combined length of all words, which the constraints cap at `10^6`. Shared prefixes share trie nodes, which is where the savings over comparing every prefix against every word come from.

**Complexity:** `O(S)` time, `O(S)` space.
