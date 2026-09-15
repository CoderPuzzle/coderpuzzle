# Binary Search Tree Iterator

## Description

Implement the `BSTIterator` class that represents an iterator over the
**in-order traversal** of a binary search tree (BST):

- `BSTIterator(int[] root)` Initializes an object of the `BSTIterator` class
  from `root`, the tree given in level order (see below). The pointer starts
  at a non-existent number smaller than every element in the BST, so the
  first call to `next()` returns the smallest element.
- `boolean hasNext()` Returns `true` if there exists a number in the
  traversal to the right of the pointer, otherwise returns `false`.
- `int next()` Moves the pointer to the right, then returns the number at the
  pointer.

Every call to `next()` is guaranteed to be valid: at least one number remains
in the in-order traversal when it is made.

**Input format.** The tree arrives as its level-order traversal, where the
value `-1` marks a missing child. Children of missing nodes are omitted and
trailing markers are dropped, so the array reads exactly like the usual
level-order picture of the tree. For example, the BST with root `7`, left
child `3`, right child `15` (whose children are `9` and `20`) is given as
`[7, 3, 15, -1, -1, 9, 20]`. Node values are never `-1`.

### Example 1

```text
Input:
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, -1, -1, 9, 20]], [], [], [], [], [], [], [], [], []]
Output: [null, 3, 7, true, 9, true, 15, true, 20, false]
Explanation:
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, -1, -1, 9, 20]);
bSTIterator.next();    // return 3
bSTIterator.next();    // return 7
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 9
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 15
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 20
bSTIterator.hasNext(); // return False
```

### Example 2

```text
Input:
["BSTIterator", "hasNext", "next", "next", "next", "next", "hasNext"]
[[[5, 3, -1, 2, 4]], [], [], [], [], [], []]
Output: [null, true, 2, 3, 4, 5, false]
Explanation:
The tree has root 5, left child 3 (children 2 and 4), and no right child.
BSTIterator bSTIterator = new BSTIterator([5, 3, -1, 2, 4]);
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 2 — leftmost node
bSTIterator.next();    // return 3
bSTIterator.next();    // return 4 — right subtree of 3 before returning to 5
bSTIterator.next();    // return 5
bSTIterator.hasNext(); // return False
```

### Constraints

- The number of nodes in the tree is in the range `[1, 10⁵]`.
- `0 <= Node.val <= 10⁶` and all values are distinct.
- At most `10⁵` calls will be made in total to `hasNext` and `next`.

### Follow-up

Could you implement `next()` and `hasNext()` to run in average `O(1)` time
and use `O(h)` memory, where `h` is the height of the tree?

## Hints

### Hint 1

Building the tree from the level-order array needs only a queue: read values
left to right, attach each non-marker value as the next child of the oldest
node still missing one, and put that node back on the queue; a `-1` marker
fills a slot without joining the queue. Once the tree exists, resist
flattening it — an iterator produces values lazily.

### Hint 2

Hold that path on a stack. Constructing the iterator pushes the root and then
every left child along the way; the stack top is then exactly the smallest
unvisited node, so `hasNext` only checks that the stack is non-empty.

### Hint 3

`next()` pops the top — that is the value to return — but the traversal is
not done with that node's right subtree: before returning, push the left
spine of the popped node's right child (pushing nothing when that child is
absent). Each node enters and leaves the stack exactly once, which is why the
average work per call is constant even though a single call may walk a spine.
