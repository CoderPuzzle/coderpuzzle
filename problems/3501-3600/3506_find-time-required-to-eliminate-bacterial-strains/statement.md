# Find Time Required to Eliminate Bacterial Strains

## Description

You are given an integer array timeReq and an integer splitTime.

In the microscopic world of the human body, the immune system faces an
extraordinary challenge: combatting a rapidly multiplying bacterial colony
that threatens the body's survival.

Initially, only one white blood cell (WBC) is deployed to eliminate the
bacteria. However, the lone WBC quickly realizes it cannot keep up with the
bacterial growth rate.

The WBC devises a clever strategy to fight the bacteria:

- The ith bacterial strain takes timeReq[i] units of time to be eliminated.
- A single WBC can eliminate only one bacterial strain. Afterwards, the WBC
  is exhausted and cannot perform any other tasks.
- A WBC can split itself into two WBCs, but this requires splitTime units of
  time. Once split, the two WBCs can work in parallel on eliminating the
  bacteria.
- Only one WBC can work on a single bacterial strain. Multiple WBCs cannot
  attack one strain in parallel.

You must determine the minimum time required to eliminate all the bacterial
strains.

Note that the bacterial strains can be eliminated in any order.

### Example 1

```text
Input: timeReq = [10,4,5], splitTime = 2
Output: 12
Explanation:
The elimination process goes as follows:
Initially, there is a single WBC. The WBC splits into 2 WBCs after 2 units
of time.
One of the WBCs eliminates strain 0 at a time t = 2 + 10 = 12. The other WBC
splits again, using 2 units of time.
The 2 new WBCs eliminate the bacteria at times t = 2 + 2 + 4 and
t = 2 + 2 + 5.
```

### Example 2

```text
Input: timeReq = [10,4], splitTime = 5
Output:15
Explanation:
The elimination process goes as follows:
Initially, there is a single WBC. The WBC splits into 2 WBCs after 5 units
of time.
The 2 new WBCs eliminate the bacteria at times t = 5 + 10 and t = 5 + 4.
```

### Constraints

- `2 <= timeReq.length <= 10⁵`
- `1 <= timeReq[i] <= 10⁹`
- `1 <= splitTime <= 10⁹`

## Hints

### Hint 1

Use binary search.

### Hint 2

First perform all the divisions, then assign the bacteria greedily.
