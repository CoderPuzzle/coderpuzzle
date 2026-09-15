# Solutions — Longest Word in Dictionary

Buildability is recursive: a word can be built one character at a time exactly
when the word minus its last character can be, bottoming out at a lone letter,
which carries the empty prefix and needs nothing. The sort leans on the
direction that recursion already points — a word's prefixes are all
lexicographically smaller than the word — so ordering the dictionary first
turns the definition into one forward sweep over a set that only grows. The
trie instead takes the recursion literally: it stores the words as a prefix
tree, and a walk from the root that descends only into nodes where a word ends
takes exactly the paths whose every prefix is a word. The sweep pays for its
order — a sort on top of the walk — while the trie reads the input once,
each character touched a constant number of times.

## Sort, then Sweep a Buildable Set

Sort `words` into lexicographic order and walk it once, carrying a hash set of
the words proven buildable so far. Any word minus its last character is
strictly smaller than the word itself, so when the sweep reaches a word its
stem has already been visited if the dictionary holds it at all: the stem is
buildable exactly when it sits in the set, and absent when it does not. A
length-1 word needs no stem and enters the set outright. Duplicates cost
nothing — the second copy finds the first already in the set.

The best-answer bookkeeping needs no comparison at all. The sweep replaces
`best` only on a strictly greater length, so among the equally long candidates
the one seen first survives — and first-seen in sorted order is precisely the
lexicographically smallest, the statement's tie rule. When no word ever enters
the set (every word starts life at length 2 or more with no letters beneath
it), `best` stays the empty string it started as, which is exactly the
statement's no-answer return.

**Complexity:** `O(n log n · L)` time, `O(n · L)` space.

## Build a Trie, then Walk Every Buildable Path

Insert every word into a trie and mark the node each word ends at. The
statement's definition then reads straight off the tree: a string is buildable
exactly when every node on its path — the root excepted — ends some word,
because those nodes are precisely the string's prefixes, all present in
`words`. The walk starts at the root and descends only into children that end
a word: every path it can take spells a buildable word, and a child that ends
no word is never entered at all.

Each trie node is reached by exactly one string, so the walk carries no
bookkeeping beyond one comparison per visit: strictly longer wins, and among
equal lengths the lexicographically smaller word wins — compared explicitly,
since a trie's children hold no order the walk could lean on. Duplicate words
mark the same terminal node twice and cost nothing. When no single letter is
itself a word, every child of the root is pruned and the best stays the empty
string it started as, which is exactly the statement's no-answer return.

**Complexity:** `O(n · L)` time, `O(n · L)` space.
