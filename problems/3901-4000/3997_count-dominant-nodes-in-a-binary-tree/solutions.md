# Solutions

The solution uses postorder subtree maxima.

## Postorder subtree maxima

Process each node after its children. The postorder result carries both the maximum value in that subtree and the number of dominant nodes already found below it.

![In the complete tree [5,3,8,2,4,7,1], the postorder subtree maxima make the four leaves 2, 4, 7, 1 and node 8 (whose subtree max is 8) dominant, while nodes 3 and 5 fall short of their subtree maxima — the answer is 5.](figures/solution-postorder-subtree-maxima.svg)

The node contributes one exactly when its value equals the maximum of its own value and both child maxima. A complete tree has logarithmic height, so the recursive postorder stack remains safe even at the maximum node count.

**Complexity:** O(n) time and O(h) space.
