# Design Underground System

## Description

An underground railway system is keeping track of customer travel times
between different stations. It uses this data to calculate the average time
it takes to travel from one station to another.

Implement the `UndergroundSystem` class:

- `void checkIn(int id, string stationName, int t)` A customer with a card ID
  equal to `id` checks in at the station `stationName` at time `t`. A customer
  can only be checked into one place at a time.
- `void checkOut(int id, string stationName, int t)` A customer with a card ID
  equal to `id` checks out from the station `stationName` at time `t`.
- `double getAverageTime(string startStation, string endStation)` Returns the
  average time it takes to travel from `startStation` to `endStation`. The
  average time is computed from all the previous traveling times from
  `startStation` to `endStation` that happened directly, meaning a check-in
  at `startStation` followed by a check-out from `endStation`.

The time it takes to travel from `startStation` to `endStation` may be
different from the time it takes to travel from `endStation` to
`startStation`. There will be at least one customer that has traveled from
`startStation` to `endStation` before `getAverageTime` is called.

You may assume all calls to `checkIn` and `checkOut` are consistent: if a
customer checks in at time `t1` then checks out at time `t2`, then
`t1 < t2`. All events happen in chronological order.

### Example 1

```text
Input:
["UndergroundSystem", "checkIn", "checkIn", "checkIn", "checkOut", "checkOut", "checkOut", "getAverageTime", "getAverageTime", "checkIn", "getAverageTime", "checkOut", "getAverageTime"]
[[], [45, "Leyton", 3], [32, "Paradise", 8], [27, "Leyton", 10], [45, "Waterloo", 15], [27, "Waterloo", 20], [32, "Cambridge", 22], ["Paradise", "Cambridge"], ["Leyton", "Waterloo"], [10, "Leyton", 24], ["Leyton", "Waterloo"], [10, "Waterloo", 38], ["Leyton", "Waterloo"]]
Output: [null, null, null, null, null, null, null, 14.0, 11.0, null, 11.0, null, 12.0]
Explanation:
UndergroundSystem undergroundSystem = new UndergroundSystem();
undergroundSystem.checkIn(45, "Leyton", 3);
undergroundSystem.checkIn(32, "Paradise", 8);
undergroundSystem.checkIn(27, "Leyton", 10);
undergroundSystem.checkOut(45, "Waterloo", 15);  // customer 45: "Leyton" -> "Waterloo" in 15 - 3 = 12
undergroundSystem.checkOut(27, "Waterloo", 20);  // customer 27: "Leyton" -> "Waterloo" in 20 - 10 = 10
undergroundSystem.checkOut(32, "Cambridge", 22); // customer 32: "Paradise" -> "Cambridge" in 22 - 8 = 14
undergroundSystem.getAverageTime("Paradise", "Cambridge"); // return 14.0 — one trip, 14 / 1.
undergroundSystem.getAverageTime("Leyton", "Waterloo");    // return 11.0 — two trips, (10 + 12) / 2.
undergroundSystem.checkIn(10, "Leyton", 24);
undergroundSystem.getAverageTime("Leyton", "Waterloo");    // return 11.0 — unchanged by the open trip.
undergroundSystem.checkOut(10, "Waterloo", 38);  // customer 10: "Leyton" -> "Waterloo" in 38 - 24 = 14
undergroundSystem.getAverageTime("Leyton", "Waterloo");    // return 12.0 — three trips, (10 + 12 + 14) / 3.
```

### Example 2

```text
Input:
["UndergroundSystem", "checkIn", "checkOut", "getAverageTime", "checkIn", "checkOut", "getAverageTime", "checkIn", "checkOut", "getAverageTime"]
[[], [10, "Leyton", 3], [10, "Paradise", 8], ["Leyton", "Paradise"], [5, "Leyton", 10], [5, "Paradise", 16], ["Leyton", "Paradise"], [2, "Leyton", 21], [2, "Paradise", 30], ["Leyton", "Paradise"]]
Output: [null, null, null, 5.0, null, null, 5.5, null, null, 6.666666666666667]
Explanation:
UndergroundSystem undergroundSystem = new UndergroundSystem();
undergroundSystem.checkIn(10, "Leyton", 3);
undergroundSystem.checkOut(10, "Paradise", 8); // 8 - 3 = 5
undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 5.0 — (5) / 1.
undergroundSystem.checkIn(5, "Leyton", 10);
undergroundSystem.checkOut(5, "Paradise", 16); // 16 - 10 = 6
undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 5.5 — (5 + 6) / 2.
undergroundSystem.checkIn(2, "Leyton", 21);
undergroundSystem.checkOut(2, "Paradise", 30); // 30 - 21 = 9
undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 6.666666666666667 — (5 + 6 + 9) / 3.
```

### Constraints

- `1 <= id, t <= 10⁶`
- `1 <= stationName.length, startStation.length, endStation.length <= 10`
- All strings consist of uppercase and lowercase English letters and digits.
- There will be at most `2 * 10⁴` calls in total to `checkIn`, `checkOut`,
  and `getAverageTime`.
- Answers within `10⁻⁵` of the actual value will be accepted.

## Hints

### Hint 1

Split the life of a trip in two: between check-in and check-out all you know
about a customer is where and when they started, so a map keyed by customer
id is enough to hold that. Everything after check-out is a station-pair
statistic.

### Hint 2

On `checkOut`, look up the pending check-in and fold `t_out - t_in` into a
per-(start, end)-pair record. The pair is the key of a second map.

### Hint 3

An average that stays queryable needs only a running sum and a count per
station pair — never a list of trip times. Returning `total / count` makes
`getAverageTime` a constant-time lookup, and reusing a customer id later is
harmless because their check-in entry was consumed at check-out.
