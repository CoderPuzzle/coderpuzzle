# Alert Using Same Key-Card Three or More Times in a One Hour Period

## Description

An office building tracks every use of its employees' key-cards: each swipe
records the worker's name and the time it happened. The security system
raises an alert for any worker who swipes their key-card three or more times
within a one-hour period.

You are given two arrays, `keyName` and `keyTime`, where `[keyName[i],
keyTime[i]]` is one worker's name and the time their key-card was used, all
recorded on a single day. Times are given in 24-hour `"HH:MM"` format, such as
`"23:51"` or `"09:49"`.

Return the list of unique worker names who receive an alert, sorted in
ascending alphabetical order.

A one-hour period means at most 60 minutes elapse between the earliest and
latest of the three swipes — `"10:00"` to `"11:00"` counts as within a
one-hour period, while `"22:51"` to `"23:52"` does not.

### Example 1

```text
Input: keyName = ["daniel","daniel","daniel","luis","luis","luis","luis"], keyTime = ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]
Output: ["daniel"]
Explanation: "daniel" used the key-card three times within a one-hour period ("10:00", "10:40", "11:00").
```

### Example 2

```text
Input: keyName = ["alice","alice","alice","bob","bob","bob","bob"], keyTime = ["12:01","12:00","18:00","21:00","21:20","21:30","23:00"]
Output: ["bob"]
Explanation: "bob" used the key-card three times within a one-hour period ("21:00", "21:20", "21:30").
```

### Constraints

- `1 <= keyName.length, keyTime.length <= 10^5`
- `keyName.length == keyTime.length`
- `keyTime[i]` is in the format `"HH:MM"`.
- `[keyName[i], keyTime[i]]` is unique.
- `1 <= keyName[i].length <= 10`
- `keyName[i]` contains only lowercase English letters.

## Hints

### Hint 1

Group the times by the name of the card user, then sort each group.
