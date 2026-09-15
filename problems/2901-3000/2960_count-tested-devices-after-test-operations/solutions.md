# Solutions — Count Tested Devices After Test Operations

Simulating the operations literally costs a suffix update per test. Reading
what the simulation actually does to a device collapses the whole process
into one cheap comparison per device.

## Count tests so far, compare against the original percentage

Every earlier test subtracts exactly 1 from every device that has not been
tested yet, so by the time the scan reaches device i, its percentage equals
the original value minus the number of tests performed so far — floored at
zero, which is precisely the "no longer testable" case. Therefore device i
is tested if and only if its original batteryPercentages[i] exceeds the
count of devices already tested, and tracking that count while walking the
array once reproduces the simulation without ever touching a suffix.

The counter only grows, and the comparison uses the original values, so no
array is modified and no auxiliary storage is needed. Values stay within
[0, 100] and n <= 100, so machine integers carry everything with no
overflow concerns.

**Complexity:** `O(n)` time, `O(1)` space.
