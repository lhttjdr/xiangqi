Chinese-Chess-in-JavaScript
===========================

A project of Chinese Chess with AI based on HTML5/canvas and native javascript.

There are 2 Search Engines.

- A very navie algorithom is MiniMax search with alpha–beta pruning.
- PVS (Principal Variation Search) or NegaScout is a much better algorithom. Some improvments are history husrestic (Assumption: If a move is good, then the next several moves are also good.), transposition table using zobrist hash (In lots of cases, moves are independent and communitive.), iterative deepening search (not a fixed search depth).

The evaluator is to eastimate whether a situation is good or not.
