# Friendly Movies Streamed Last Month

## Description

Table `TVProgram`:

| Column Name  | Type    |
| ------------ | ------- |
| program_date | date    |
| content_id   | int     |
| channel      | varchar |

`(program_date, content_id)` is the primary key for this table. This
table contains information of the programs on the TV. `content_id` is
the id of the program in some channel on the TV.

Table `Content`:

| Column Name  | Type    |
| ------------ | ------- |
| content_id   | int     |
| title        | varchar |
| Kids_content | enum    |
| content_type | varchar |

`content_id` is the primary key for this table. `Kids_content` is an
ENUM (category) of types (`'Y'`, `'N'`) where `'Y'` means is content for
kids otherwise `'N'` is not content for kids. `content_type` is the
category of the content as movies, series, etc.

Write a solution to report the distinct titles of the kid-friendly
movies streamed in June 2020.

Return the result table in any order.

Each testcase's `dataset` seeds the tables: its script inserts the
testcase's `TVProgram` and `Content` rows before your query runs. The
result format is in the following example.

### Example 1

```text
Input:
TVProgram table:
+--------------------+--------------+-------------+
| program_date       | content_id   | channel     |
+--------------------+--------------+-------------+
| 2020-06-10 08:00   | 1            | LC-Channel  |
| 2020-05-11 12:00   | 2            | LC-Channel  |
| 2020-05-12 12:00   | 3            | LC-Channel  |
| 2020-05-13 14:00   | 4            | Disney Ch   |
| 2020-06-18 14:00   | 4            | Disney Ch   |
| 2020-07-15 16:00   | 5            | Disney Ch   |
+--------------------+--------------+-------------+
Content table:
+------------+------------------+---------------+---------------+
| content_id | title            | Kids_content  | content_type  |
+------------+------------------+---------------+---------------+
| 1          | Leetcode Movie   | N             | Movies        |
| 2          | Alg. for Kids    | Y             | Series        |
| 3          | Database Sols    | N             | Series        |
| 4          | Aladdin          | Y             | Movies        |
| 5          | Cinderella       | Y             | Movies        |
+------------+------------------+---------------+---------------+
Output:
+--------------+
| title        |
+--------------+
| Aladdin      |
+--------------+
Explanation:
"Leetcode Movie" is not a content for kids.
"Alg. for Kids" is not a movie.
"Database Sols" is not a movie.
"Aladdin" is a movie, content for kids and was streamed in June 2020.
"Cinderella" was not streamed in June 2020.
```

## Hints

### Hint 1

Join `Content` with `TVProgram` on `content_id` and filter the joined
rows on all three conditions at once: kid-friendly (`Kids_content =
'Y'`), a movie (`content_type = 'Movies'`), and June 2020.

### Hint 2

For the date window, compare the month extracted from `program_date`
against `'2020-06'` — SQLite's `STRFTIME('%Y-%m', ...)` produces exactly
that shape — and let `SELECT DISTINCT` collapse titles streamed more
than once into a single row.
