# Strong Password Checker II

## Description

A password is said to be strong if it satisfies all the following criteria:

- It has at least 8 characters.
- It contains at least one lowercase letter.
- It contains at least one uppercase letter.
- It contains at least one digit.
- It contains at least one special character. The special characters are the
  characters in the following string: "!@#$%^&*()-+".
- It does not contain 2 of the same character in adjacent positions (i.e.,
  "aab" violates this condition, but "aba" does not).

Given a string password, return true if it is a strong password. Otherwise,
return false.

### Example 1

```text
Input: password = "IloveLe3tcode!"
Output: true
Explanation: The password meets all the requirements. Therefore, we return true.
```

### Example 2

```text
Input: password = "Me+You--IsMyDream"
Output: false
Explanation: The password does not contain a digit and also contains 2 of the same character in adjacent positions. Therefore, we return false.
```

### Example 3

```text
Input: password = "1aB!"
Output: false
Explanation: The password does not meet the length requirement. Therefore, we return false.
```

### Constraints

- `1 <= password.length <= 100`
- password consists of letters, digits, and special characters:
  "!@#$%^&*()-+".

## Hints

### Hint 1

You can use a boolean flag to define certain types of characters seen in the
string.

### Hint 2

In the end, check if all boolean flags have ended up True, and do not forget
to check the "adjacent" and "length" criteria.
