# Solutions

The solution uses postorder subtree maxima.

## Postorder subtree maxima

Process each node after its children. The postorder result carries both the maximum value in that subtree and the number of dominant nodes already found below it.

The node contributes one exactly when its value equals the maximum of its own value and both child maxima. A complete tree has logarithmic height, so the recursive postorder stack remains safe even at the maximum node count.

**Complexity:** O(n) time and O(h) space.
