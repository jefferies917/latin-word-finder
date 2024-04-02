# Latin Word Finder

This repository contains a simple TypeScript program that finds the longest word that can be formed using a given set of letters, utilizing a dictionary of Latin words. The program efficiently loads the dictionary from a file and employs a set for quick word lookup. It provides a command-line interface for users to input letters and receive the longest valid Latin word as output. This tool can be helpful for language enthusiasts, Latin learners, or anyone interested in word games.

Features:

- Efficient dictionary loading and word lookup
- Command-line interface for easy interaction
- Provides the longest Latin word possible from the given letters

## How to Run

1. cd into `homa-task/src/`
2. Run `npx tsc` to compile the TypeScript code into JavaScript.
3. Run `node app.js <letters>` where `<letters>` should be replaced with the letters you want to find the longest word for.

May require `npm install` for @types/node

Example:
```sh
node app.js acrdtsgr
```

By following these steps, the reader will understand how to run the script with the new feature of providing input letters via command line arguments.

### Testing

1. cd into `homa-task/`
2. Run `npm test`

## SQL queries requested
This was a technical test for a company that also wanted me to demonstrate some knowledge of SQL, hence the SQL queries at the bottom of the file.

A. 
1. Goals with beauty above 0.9 or below 0.1
```
SELECT *
FROM GOALS
WHERE beauty > 0.9 OR beauty < 0.1;
```

2. Players of 'FCB' who have scored at least 1 goal
```
SELECT P.*
FROM PLAYERS P
JOIN GOALS G ON P.ID = G.striker_id
WHERE P.team = 'FCB'
GROUP BY P.ID
HAVING COUNT(G.ID) >= 1;
```

3. Players of 'FCB' with market valuation greater than 8 million and scored at least 10 goals
```
SELECT P.*
FROM PLAYERS P
JOIN GOALS G ON P.ID = G.striker_id
WHERE P.team = 'FCB'
GROUP BY P.ID
HAVING P.market_value < 8.0 AND COUNT(G.ID) >= 10;
```

4. Number of goals scored for each team and homeland on Nov. 22, 2016
```
SELECT P.team, P.homeland, COUNT(G.ID) AS goals_count
FROM PLAYERS P
LEFT JOIN GOALS G ON P.ID = G.striker_id
WHERE DATE(G.timestamp) = '2016-11-22'
GROUP BY P.team, P.homeland;
```

5. Average goal beauty over all players in 'PSG'
```
SELECT AVG(G.beauty) AS avg_goal_beauty
FROM PLAYERS P
JOIN GOALS G ON P.ID = G.striker_id
WHERE P.team = 'PSG';
```

B. Why? The WHERE query is selecting A.player_id = B.player.id, using a dot instead of an underscore. This is probably a typo

How would I rewrite it? The where query should be: WHERE A.player_id = B.player_id. Id probably consider changing the name of the column to striker_id to avoid confusion

C. How would i rewrite the query to remove a subquery? By using JOIN
```
SELECT COUNT(*) AS goalless_players_count, A.team
FROM PLAYERS AS A
LEFT JOIN GOALS AS B ON A.player_id = B.player_id
WHERE B.player_id IS NULL
GROUP BY A.team;
```