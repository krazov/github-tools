# GitHub tools

Set of NodeJS tools for Github that I wrote for myself in an urgent need.

They are intended to be used in a command line, at the moment as params for `node`. There are no plans to make it more user friendly for the time being.

## Getting data

```
cd data-fetching tools
``` 

1. Fetching issues:
    ```
    node issues.js
    ```
2. Fetching comments:
    ```
    node comments.js
    ```
  
  
## Displaying data

Displaying opened issues:

```
node open-issues.js
```

Displaying closed issues:

```
node closed-issues.js
```

Displaying opened pull requests:

```
node pull-requests.js
```

Displaying details of a ticket (plus comments if available):

```
node print-issue.js <ticket id>
```

Displaying raw data for the ticket (without comments):

```
node raw-issue.js <ticket id>
```