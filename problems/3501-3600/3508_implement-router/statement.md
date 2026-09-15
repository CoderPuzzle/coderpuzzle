# Implement Router

## Description

Design a data structure that can efficiently manage data packets in a network
router. Each data packet consists of the following attributes:

- `source`: a unique identifier for the machine that generated the packet.
- `destination`: a unique identifier for the target machine.
- `timestamp`: the time at which the packet arrived at the router.

Implement the `Router` class:

- `Router(int memoryLimit)` Initializes the object with a fixed memory limit.
  `memoryLimit` is the maximum number of packets the router can store at any
  given time. If adding a new packet would exceed this limit, the oldest
  packet must be removed to free up space.
- `boolean addPacket(int source, int destination, int timestamp)` Adds a
  packet with the given attributes to the router. A packet is considered a
  duplicate if another packet with the same `source`, `destination`, and
  `timestamp` already exists in the router. Return `true` if the packet is
  successfully added (i.e. it is not a duplicate); otherwise return `false`.
- `int[] forwardPacket()` Forwards the next packet in FIFO (first in, first
  out) order: remove the packet from storage and return it as the array
  `[source, destination, timestamp]`. If there are no packets to forward,
  return an empty array.
- `int getCount(int destination, int startTime, int endTime)` Returns the
  number of packets currently stored in the router (i.e. not yet forwarded)
  that have the specified `destination` and a timestamp in the inclusive
  range `[startTime, endTime]`.

Queries for `addPacket` will be made in non-decreasing order of `timestamp`.

### Example 1

```text
Input:
["Router", "addPacket", "addPacket", "addPacket", "addPacket", "addPacket", "forwardPacket", "addPacket", "getCount"]
[[3], [1, 4, 90], [2, 5, 90], [1, 4, 90], [3, 5, 95], [4, 5, 105], [], [5, 2, 110], [5, 100, 110]]
Output: [null, true, true, false, true, true, [2, 5, 90], true, 1]
Explanation:
Router router = new Router(3); // memory limit of 3.
router.addPacket(1, 4, 90);    // packet added, return true.
router.addPacket(2, 5, 90);    // packet added, return true.
router.addPacket(1, 4, 90);    // duplicate packet, return false.
router.addPacket(3, 5, 95);    // packet added, return true.
router.addPacket(4, 5, 105);   // packet added, [1, 4, 90] evicted — return true.
router.forwardPacket();        // return [2, 5, 90] and remove it from storage.
router.addPacket(5, 2, 110);   // packet added, return true.
router.getCount(5, 100, 110);  // only [4, 5, 105] matches — return 1.
```

### Example 2

```text
Input:
["Router", "addPacket", "forwardPacket", "forwardPacket"]
[[2], [7, 4, 90], [], []]
Output: [null, true, [7, 4, 90], []]
Explanation:
Router router = new Router(2);
router.addPacket(7, 4, 90); // return true.
router.forwardPacket();     // return [7, 4, 90].
router.forwardPacket();     // no packets left, return [].
```

### Constraints

- `2 <= memoryLimit <= 10⁵`
- `1 <= source, destination <= 2 * 10⁵`
- `1 <= timestamp <= 10⁹`
- `1 <= startTime <= endTime <= 10⁹`
- At most `10⁵` calls will be made to `addPacket`, `forwardPacket`, and
  `getCount` altogether.
- Queries for `addPacket` will be made in non-decreasing order of `timestamp`.

### Follow-up

Packets only ever leave from the front of the queue — what does that let you
do instead of deleting from each destination's timestamp list?

## Hints

### Hint 1

Three state pieces carry everything: the FIFO queue itself, a set of the
packets currently stored (for duplicate detection), and per-destination lists
of the stored timestamps (for counting). Add packets to all three; removals
touch exactly one destination's list.

### Hint 2

Timestamps arrive in non-decreasing order, so each destination's list is
sorted without any effort — and `getCount` over `[startTime, endTime]` is two
binary searches over it.

### Hint 3

Removals always take the _oldest_ packet overall, which in any destination's
list is its first live entry. Keep a per-destination head index and advance
it on eviction/forwarding instead of shifting the list: live entries are
always a suffix, and binary searches simply start at the head.
