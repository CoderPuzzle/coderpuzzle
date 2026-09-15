# Solutions — Is Object Empty

A JSON object or array is empty exactly when it exposes no enumerable own
property, so one property probe is enough to decide the predicate.

## Stop at the First Own Property

Iterate over the container with `for...in`. JSON.parse produces ordinary
arrays and objects: every array element and every object key-value pair is
an enumerable own property. Encountering the first own property therefore
proves the input is not empty, and the function can return `false`
immediately.

The `hasOwnProperty` call distinguishes the input's data from anything on
its prototype. If the loop finishes without finding an own property, an
object has no key-value pairs or an array has no elements, so the function
returns `true`. Nested values do not need inspection because even an empty
container stored inside the input still occupies one top-level property or
array element.

**Complexity:** `O(1)` time and `O(1)` space under the JSON object-or-array
input contract; at most one own entry is inspected.
