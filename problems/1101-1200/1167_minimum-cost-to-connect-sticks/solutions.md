# Solutions — Minimum Cost to Connect Sticks

## Greedy Min-Heap Merging

Each merge of lengths `x` and `y` costs `x + y`, and the combined stick carries that sum into every later merge it joins — so a stick's original length is paid once for each merge that happens above it. Minimizing the total therefore means long sticks should participate in as few merges as possible, which is achieved by always merging the two shortest sticks currently available (the same exchange argument as Huffman coding: any optimal first merge can be rearranged to use the two shortest without increasing cost).

A min-heap of the stick lengths gives the two smallest in logarithmic time. The loop pops the two shortest, adds their sum to the running total, and pushes the combined length back for future merges. Each iteration reduces the stick count by one, so after `len(sticks) - 1` iterations a single stick remains and the accumulated total is the answer.

A single stick needs no merge and returns 0 immediately, which also covers the smallest input. Sorting up-front is unnecessary — `heapify` builds the heap in linear time, and the sequence of pops automatically considers sticks in the right order as combined lengths re-enter the pool.

**Complexity:** `O(N log N)` time, `O(N)` space.
