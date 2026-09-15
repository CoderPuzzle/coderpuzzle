# Solutions — Find Peak Calling Hours for Each City

## Count per city-hour, rank within the city, keep the tied top

The first CTE collapses the raw calls into one row per city and hour:
`strftime('%H', call_time)` reads the hour-of-day out of the timestamp and
`CAST` turns the `'00'`–`'23'` text into a plain integer, and grouping on
`(city, hour)` with `COUNT(*)` makes calls placed in the same hour on
different dates land in the same group — the semantics the statement's
Houston example fixes. The result carries exactly the three output columns.

A `RANK() OVER (PARTITION BY city ORDER BY number_of_calls DESC)` window
then positions every hour inside its own city: rank 1 goes to the busiest
hour, and — because `RANK` assigns equal ranks to equal counts — to every
hour tied with it. The outer filter `rnk = 1` therefore keeps all of a
city's peak hours, which is precisely the tie rule the problem asks for.
The final `ORDER BY peak_calling_hour DESC, city DESC` emits the surviving
rows in the required double-descending order.

Both passes are linear in the number of city-hour groups once the input is
grouped, and the grouping itself sorts calls by its key; with `C` call rows
and `G` distinct city-hour pairs the query does `O(C log C)` work for the
grouping and `O(G log G)` for the ranking, storing one row per group.

**Complexity:** `O(C log C)` time, `O(G)` space.
