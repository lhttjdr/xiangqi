Chinese Chess (Xiangqi) in TypeScript
===========================

NOTICE: It is a proof-of-concept project. The evaluator is weak, and currently there are no advanced method such as Quiescence Search.

A project of Chinese Chess with AI based on HTML5/canvas and TypeScript. Here is a [demo](https://lhttjdr.github.io/xiangqi/).

There are several Search Engines.

- a very navie algorithom is `minimax` search
- `negamax`, which is a common way of implementing minimax
- minimax search with alpha–beta pruning
- negamax search with alpha–beta pruning (fail hard)
- fail soft alpha-beta algorithm
- a simple `aspiration search` based on fail-soft alpha-beta search
- `PVS` (Principal Variation Search)
- `NegaScout` (almost the same with PVS, sometime just another name of PVS)
- NegaScout with transposition table and history heuristic enhancement
- `MTD(f)`, Memory-enhanced Test Driver with node `n` and value `f`
- iterative deepening version of fail-hard alpha-beta algorithm (using time limitation)
- iterative deepening version of PVS (using time limitation)
- iterative deepening version of NegaScout with transposition table and history heuristic enhancement

Here,
- history husrestic (Assumption: If a move is good, then the next several moves are also good)
- transposition table using Zobrist hash (In lots of cases, moves are independent and communitive)
- iterative deepening search using time limitation (not fixed search depth, but depends on time cost)
