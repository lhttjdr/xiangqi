(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Xiangqi", [], factory);
	else if(typeof exports === 'object')
		exports["Xiangqi"] = factory();
	else
		root["Xiangqi"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// two players
var PLAYER;
(function (PLAYER) {
    PLAYER[PLAYER["Red"] = 0] = "Red";
    PLAYER[PLAYER["Black"] = 1] = "Black";
})(PLAYER = exports.PLAYER || (exports.PLAYER = {}));
;
exports.opponent = function (self) {
    return self == PLAYER.Black ? PLAYER.Red : PLAYER.Black;
};
// 7 types of pieces
var PIECE;
(function (PIECE) {
    PIECE[PIECE["King"] = 0] = "King";
    PIECE[PIECE["Guard"] = 1] = "Guard";
    PIECE[PIECE["Bishop"] = 2] = "Bishop";
    PIECE[PIECE["Knight"] = 3] = "Knight";
    PIECE[PIECE["Rook"] = 4] = "Rook";
    PIECE[PIECE["Cannon"] = 5] = "Cannon";
    PIECE[PIECE["Pawn"] = 6] = "Pawn";
})(PIECE = exports.PIECE || (exports.PIECE = {}));
;
exports.character = function (type, owner) {
    switch (type) {
        case PIECE.King: return owner == PLAYER.Red ? "帥" : "將";
        case PIECE.Guard: return owner === PLAYER.Red ? "仕" : "士";
        case PIECE.Bishop: return owner == PLAYER.Red ? "相" : "象";
        case PIECE.Knight: return owner == PLAYER.Red ? "傌" : "馬";
        case PIECE.Rook: return owner === PLAYER.Red ? "俥" : "車";
        case PIECE.Cannon: return owner == PLAYER.Red ? "炮" : "砲";
        case PIECE.Pawn: return owner === PLAYER.Red ? "兵" : "卒";
    }
};
// board size 9*10
var SIZE = /** @class */ (function () {
    function SIZE() {
    }
    SIZE.files = 9;
    SIZE.ranks = 10;
    return SIZE;
}());
exports.SIZE = SIZE;
;
exports.pos2idx = function (x, y) {
    return y * SIZE.files + x;
};
var STATUS;
(function (STATUS) {
    STATUS[STATUS["NotEnded"] = 0] = "NotEnded";
    STATUS[STATUS["Win"] = 1] = "Win";
    STATUS[STATUS["Lost"] = 2] = "Lost";
    STATUS[STATUS["Draw"] = 3] = "Draw";
    STATUS[STATUS["FlyCheck"] = 4] = "FlyCheck";
    STATUS[STATUS["Stalemate"] = 5] = "Stalemate";
    STATUS[STATUS["Impossbile"] = 6] = "Impossbile";
})(STATUS = exports.STATUS || (exports.STATUS = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// 2d point
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.moveBy = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Point.prototype.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Point.prototype.equals = function (point) {
        return this.x === point.x && this.y === point.y;
    };
    Point.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    return Point;
}());
exports.default = Point;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(1);
var Move_1 = __webpack_require__(3);
var define_1 = __webpack_require__(0);
// test a move on given board (BoardBase)
var Rule = /** @class */ (function () {
    function Rule() {
    }
    // basic concepts
    // board size: [0,9]x[0,10]
    Rule.isOutsideBoard = function (pos) {
        return pos.x < 0 || pos.x >= define_1.SIZE.files || pos.y < 0 || pos.y >= define_1.SIZE.ranks;
    };
    // castle: [3,5]x[0,2] and [3,5]x[7,10]
    Rule.isInCastle = function (pos, owner, board) {
        if (pos.x < 3 || pos.x > 5)
            return false;
        if (owner === board.upSidePlayer) {
            return pos.y <= 2;
        }
        else {
            return pos.y >= 7;
        }
    };
    // two sides of the river: up [0,9]x[0,4], below [0,9]x[5,10]
    Rule.isCrossRiver = function (pos, owner, board) {
        if (owner === board.upSidePlayer) {
            return pos.y >= 5;
        }
        else {
            return pos.y <= 4;
        }
    };
    // quick test before current player doing anything
    Rule.quickTestStatus = function (board) {
        // two kings
        var own = null;
        var opponent = null;
        var pos = new Point_1.default();
        try {
            // castle
            for (var _a = __values([3, 4, 5]), _b = _a.next(); !_b.done; _b = _a.next()) {
                var x = _b.value;
                try {
                    for (var _c = __values([0, 1, 2, 7, 8, 9]), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var y = _d.value;
                        pos.moveTo(x, y);
                        var piece = board.at(pos);
                        if (piece == null)
                            continue;
                        if (piece.type === define_1.PIECE.King) {
                            if (piece.isOwnedBy(board.currentMover))
                                own = pos.clone();
                            else
                                opponent = pos.clone();
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (own == null && opponent == null) {
            return define_1.STATUS.Impossbile;
        }
        else if (own == null) {
            return define_1.STATUS.Lost;
        }
        else if (opponent == null) {
            return define_1.STATUS.Win;
        }
        // if two kings face each other
        if (own.x === opponent.x) {
            // count intervening pieces
            var up = (board.currentMover == board.upSidePlayer ? own.y : opponent.y);
            var blew = (board.currentMover == board.blewSidePlayer ? own.y : opponent.y);
            var intervening = 0;
            pos.moveTo(own.x, up + 1);
            while (pos.y < blew) {
                if (!board.empty(pos)) {
                    ++intervening;
                    break; // at least have one intervening pieces 
                }
                pos.y += 1;
            }
            // with no intervening pieces, fly check
            // win or lost depends on whose move causes fly check
            if (intervening === 0)
                return define_1.STATUS.FlyCheck;
        }
        // no possible moves, resign
        // if (Rule.getPossibleMoves(board, true).length==0) return STATUS.Stalemate;
        // it can be checked in search process, so the possible moves only need generate once.
        if (board.moveHistory.length > 60) {
            if (board.moveHistory.slice(-60).every(function (m) { return m.target == null; }))
                return define_1.STATUS.Draw;
        }
        // TODO:: perpetual checking and chasing
        // TODO:: draw
        return define_1.STATUS.NotEnded;
        var e_2, _f, e_1, _e;
    };
    // test legality of move on a given board
    Rule.isLegalMove = function (move, board) {
        var from = move.from, to = move.to;
        // basic rules
        if (Rule.isOutsideBoard(from) || Rule.isOutsideBoard(to))
            return false;
        var piece = board.at(from);
        if (piece == null)
            throw Error("Piece Not Found!");
        if (!piece.isOwnedBy(board.currentMover))
            return false;
        var target = board.at(to);
        if (target != null) {
            if (piece.isSameOwnerWith(target))
                return false;
        }
        // special rules for each type of pieces
        switch (piece.type) {
            case define_1.PIECE.King:
                return Rule.isLegalKingMove(move, piece.owner, board);
            case define_1.PIECE.Guard:
                return Rule.isLegalGuardMove(move, piece.owner, board);
            case define_1.PIECE.Bishop:
                return Rule.isLegalBishopMove(move, piece.owner, board);
            case define_1.PIECE.Knight:
                return Rule.isLegalKnightMove(move, board);
            case define_1.PIECE.Rook:
                return Rule.isLegalRookMove(move, board);
            case define_1.PIECE.Cannon:
                return Rule.isLegalCannonMove(move, board);
            case define_1.PIECE.Pawn:
                return Rule.isLegalPawnMove(move, piece.owner, board);
            default:
                throw new Error("Unkown Piece Type!");
        }
    };
    // special rules for each piece type
    Rule.isLegalCannonMove = function (move, board) {
        var from = move.from, to = move.to;
        var dx = to.x - from.x, dy = to.y - from.y;
        // on same file or rank
        if (dx != 0 && dy != 0)
            return false;
        var steps = Math.abs(dx) || Math.abs(dy);
        var unitX = dx == 0 ? 0 : (dx > 0 ? 1 : -1), unitY = dy == 0 ? 0 : (dy > 0 ? 1 : -1);
        var pos = from.clone();
        var intervening = 0;
        for (var i = 1; i < steps; ++i) {
            pos.moveBy(unitX, unitY);
            if (!board.empty(pos))
                ++intervening;
            if (intervening > 1)
                return false; // more than one intervening pieces
        }
        // general move with no intervening pieces;
        // attack move with exact one intervening piece
        return board.empty(to) ? intervening === 0 : intervening === 1;
    };
    Rule.isLegalRookMove = function (move, board) {
        var from = move.from, to = move.to;
        var dx = to.x - from.x, dy = to.y - from.y;
        // same file or rank 
        if (dx != 0 && dy != 0)
            return false;
        var steps = Math.abs(dx) || Math.abs(dy);
        var unitX = dx == 0 ? 0 : (dx > 0 ? 1 : -1), unitY = dy == 0 ? 0 : (dy > 0 ? 1 : -1);
        var pos = from.clone();
        for (var i = 1; i < steps; ++i) {
            pos.moveBy(unitX, unitY);
            if (!board.empty(pos))
                return false; // at least one intervening piece
        }
        return true; // with no intervening pieces
    };
    Rule.isLegalBishopMove = function (move, owner, board) {
        var from = move.from, to = move.to;
        // should not cross the river
        if (Rule.isCrossRiver(from, owner, board) || Rule.isCrossRiver(to, owner, board))
            return false;
        var dx = to.x - from.x, dy = to.y - from.y;
        if (Math.abs(dx) != 2 || Math.abs(dy) != 2)
            return false;
        var pos = new Point_1.default(from.x + dx / 2, from.y + dy / 2);
        return board.empty(pos);
    };
    Rule.isLegalKingMove = function (move, owner, board) {
        var from = move.from, to = move.to;
        // king should stay in owner's castle
        if (!Rule.isInCastle(from, owner, board) || !Rule.isInCastle(to, owner, board))
            return false;
        var dx = to.x - from.x, dy = to.y - from.y;
        if (Math.abs(dx) + Math.abs(dy) != 1)
            return false;
        return true;
    };
    Rule.isLegalGuardMove = function (move, owner, board) {
        var from = move.from, to = move.to;
        // guard should stay in owner's castle
        if (!Rule.isInCastle(from, owner, board) || !Rule.isInCastle(to, owner, board))
            return false;
        var dx = to.x - from.x, dy = to.y - from.y;
        if (Math.abs(dx) != 1 || Math.abs(dy) != 1)
            return false;
        return true;
    };
    Rule.isLegalKnightMove = function (move, board) {
        var from = move.from, to = move.to;
        var dx = to.x - from.x, dy = to.y - from.y;
        if (dx == 0 || dy == 0 || Math.abs(dx) + Math.abs(dy) != 3)
            return false;
        var pos = from.clone();
        if (Math.abs(dx) == 2)
            pos.x += dx / 2;
        else
            pos.y += dy / 2;
        return board.empty(pos);
    };
    Rule.isLegalPawnMove = function (move, owner, board) {
        var from = move.from, to = move.to;
        var dx = to.x - from.x, dy = to.y - from.y;
        // before crossing river, move only forward
        if (!Rule.isCrossRiver(from, owner, board) && dx != 0)
            return false;
        // move backward is not allowed
        if (owner === board.upSidePlayer && dy < 0)
            return false;
        else if (owner === board.blewSidePlayer && dy > 0)
            return false;
        if (Math.abs(dx) + Math.abs(dy) != 1)
            return false;
        return true;
    };
    //
    Rule.getPossibleMoves = function (board, currentMoverOnly) {
        if (currentMoverOnly === void 0) { currentMoverOnly = true; }
        var allMoves = [], pos = new Point_1.default(0, 0);
        for (var i = 0; i < define_1.SIZE.files; i++) {
            for (var j = 0; j < define_1.SIZE.ranks; j++) {
                pos.moveTo(i, j);
                var piece = board.at(pos);
                if (piece == null)
                    continue;
                if (currentMoverOnly && piece.owner != board.currentMover)
                    continue;
                var moves = [];
                switch (piece.type) {
                    case define_1.PIECE.King:
                        moves = Rule.getKingPossibleMoves(piece, pos, board);
                        break;
                    case define_1.PIECE.Guard:
                        moves = Rule.getGuardPossibleMoves(piece, pos, board);
                        break;
                    case define_1.PIECE.Bishop:
                        moves = Rule.getBishopPossibleMoves(piece, pos, board);
                        break;
                    case define_1.PIECE.Knight:
                        moves = Rule.getKnightPossibleMoves(piece, pos, board);
                        break;
                    case define_1.PIECE.Rook:
                        moves = Rule.getRookPossibleMoves(piece, pos, board);
                        break;
                    case define_1.PIECE.Cannon:
                        moves = Rule.getCannonPossibleMoves(piece, pos, board);
                        break;
                    case define_1.PIECE.Pawn:
                        moves = Rule.getPawnPossibleMoves(piece, pos, board);
                        break;
                    default:
                        throw new Error("Unkown Piece Type!");
                }
                allMoves = allMoves.concat(moves);
            }
        }
        if (currentMoverOnly)
            return allMoves.filter(function (move) { return move.protege == null; });
        return allMoves;
    };
    Rule.possibleMove = function (piece, from, to, relate) {
        var move = new Move_1.default(from.clone(), to.clone()); // general move
        if (relate != null) {
            if (piece.isSameOwnerWith(relate))
                move.guard(relate.type); // guard a piece
            else
                move.attack(relate.type); // attack a piece
        }
        return move;
    };
    // NOTE:: for high performace, is should not use legality checker above.
    Rule.getKingPossibleMoves = function (piece, pos, board) {
        var moves = [];
        var from = pos.clone();
        // test 4 directions
        [[-1, 0], [0, -1], [1, 0], [0, 1]].forEach(function (d) {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                if (Rule.isInCastle(pos, piece.owner, board)) {
                    moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                }
            }
        });
        return moves;
    };
    Rule.getGuardPossibleMoves = function (piece, pos, board) {
        var moves = [];
        var from = pos.clone();
        // test 4 directions
        [[-1, 1], [1, -1], [1, 1], [-1, -1]].forEach(function (d) {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                if (Rule.isInCastle(pos, piece.owner, board)) {
                    moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                }
            }
        });
        return moves;
    };
    Rule.getBishopPossibleMoves = function (piece, pos, board) {
        var _this = this;
        var moves = [];
        var from = pos.clone();
        // test 4 directions
        [[-2, 2], [2, -2], [2, 2], [-2, -2]].forEach(function (d) {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                if (!_this.isCrossRiver(pos, piece.owner, board)) {
                    // not blocking the elephant's eye
                    if (board.empty(new Point_1.default(from.x + d[0] / 2, from.y + d[1] / 2))) {
                        moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                    }
                }
            }
        });
        return moves;
    };
    Rule.getKnightPossibleMoves = function (piece, pos, board) {
        var moves = [];
        var from = pos.clone();
        // test 8 directions
        [[1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2]].forEach(function (d) {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                var hobble = d.map(function (x) { return x > 0 ? Math.floor(x / 2) : Math.ceil(x / 2); });
                // not hobbling the horse's leg
                if (board.empty(new Point_1.default(from.x + hobble[0], from.y + hobble[1]))) {
                    moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                }
            }
        });
        return moves;
    };
    Rule.getRookPossibleMoves = function (piece, pos, board) {
        var moves = [];
        var from = pos.clone();
        // test 4 directions
        [[-1, 0], [1, 0], [0, 1], [0, -1]].forEach(function (d) {
            var to = new Point_1.default(from.x + d[0], from.y + d[1]);
            while (!Rule.isOutsideBoard(to) && board.empty(to)) {
                moves.push(new Move_1.default(from.clone(), to.clone()));
                to.moveBy(d[0], d[1]);
            }
            if (!Rule.isOutsideBoard(to)) {
                moves.push(Rule.possibleMove(piece, from, to, board.at(to)));
            }
        });
        return moves;
    };
    Rule.getPawnPossibleMoves = function (piece, pos, board) {
        var moves = [];
        var from = pos.clone();
        // test 4 directions
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) {
            // not backword
            if ((piece.isOwnedBy(board.upSidePlayer) && d[1] != -1) ||
                (piece.isOwnedBy(board.blewSidePlayer) && d[1] != 1)) {
                // cross river or forward
                if (Rule.isCrossRiver(from, piece.owner, board) || d[0] == 0) {
                    var to = new Point_1.default(from.x + d[0], from.y + d[1]);
                    if (!Rule.isOutsideBoard(to)) {
                        moves.push(Rule.possibleMove(piece, from, to, board.at(to)));
                    }
                }
            }
        });
        return moves;
    };
    Rule.getCannonPossibleMoves = function (piece, pos, board) {
        var moves = [];
        var from = pos.clone();
        // test 4 directions
        [[-1, 0], [1, 0], [0, 1], [0, -1]].forEach(function (d) {
            var to = new Point_1.default(from.x + d[0], from.y + d[1]);
            while (!Rule.isOutsideBoard(to) && board.empty(to)) {
                moves.push(new Move_1.default(from.clone(), to.clone()));
                to.moveBy(d[0], d[1]);
            }
            if (!Rule.isOutsideBoard(to))
                to.moveBy(d[0], d[1]);
            while (!Rule.isOutsideBoard(to) && board.empty(to)) {
                to.moveBy(d[0], d[1]);
            }
            // attack or guard
            if (!Rule.isOutsideBoard(to)) {
                moves.push(Rule.possibleMove(piece, from, to, board.at(to)));
            }
        });
        return moves;
    };
    return Rule;
}());
exports.default = Rule;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// move a piece
var Move = /** @class */ (function () {
    function Move(from, to) {
        this.from = from.clone();
        this.to = to.clone();
        this.target = null;
        this.protege = null;
    }
    Move.prototype.attack = function (piece) {
        this.target = piece;
    };
    Move.prototype.guard = function (piece) {
        this.protege = piece;
    };
    Move.prototype.toString = function () {
        return this.from.toString() + "-->" + this.to.toString();
    };
    Move.prototype.clone = function () {
        var move = new Move(this.from, this.to);
        move.attack(this.target);
        move.guard(this.protege);
        return move;
    };
    return Move;
}());
exports.default = Move;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// data of piece
var Piece = /** @class */ (function () {
    function Piece(owner, type) {
        this.type = type;
        this.owner = owner;
    }
    Piece.prototype.equals = function (piece) {
        return this.type === piece.type && this.owner === piece.owner;
    };
    Piece.prototype.isOwnedBy = function (owner) {
        return this.owner === owner;
    };
    Piece.prototype.isSameOwnerWith = function (piece) {
        return this.owner === piece.owner;
    };
    Piece.prototype.clone = function () {
        return new Piece(this.owner, this.type);
    };
    return Piece;
}());
exports.default = Piece;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rect_1 = __webpack_require__(6);
var Widget = /** @class */ (function () {
    function Widget(parent, canvas) {
        this.parent = parent || null;
        if (canvas == null) {
            if (this.parent == null)
                throw Error("Widget must have canvas!");
            else
                this.canvas = this.parent.canvas;
        }
        else {
            this.canvas = canvas;
        }
        this.children = new Array();
        this.offsetRect = new Rect_1.default(0, 0, 0, 0);
        if (this.parent != null)
            this.parent.addChild(this);
        this.eachChild(function (el) { return el.onPaint(); });
    }
    //
    Widget.prototype.addChild = function (child) {
        if (!this.hasChild(child)) {
            this.children.push(child);
        }
        child.parent = this;
    };
    Widget.prototype.removeChild = function (child) {
        var i = this.children.indexOf(child);
        return this.children.splice(i, 1)[0];
    };
    Widget.prototype.hasChild = function (child) {
        return this.children.indexOf(child) >= 0;
    };
    //
    Widget.prototype.eachChild = function (callback, bottomUp) {
        if (bottomUp === void 0) { bottomUp = true; }
        if (!bottomUp) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                if (callback(this.children[i]))
                    break;
            }
        }
        else {
            for (var i = 0; i < this.children.length; i++) {
                if (callback(this.children[i]))
                    break;
            }
        }
    };
    // move to front
    Widget.prototype.moveChildToTop = function (child) {
        child = this.removeChild(child);
        if (child != null)
            this.children.push(child);
    };
    // Mouse event system has only one entry that is browser event being
    // passed in at the bottom Widget named View.
    // So, they are declared as protected and can not be called by user directly.
    Widget.prototype.onMouseDown = function (point) {
        this.eachChild(function (el) {
            if (el.hitTest(point)) {
                el.onMouseDown(point);
                return true;
            }
            else {
                return false;
            }
        }, false);
    };
    Widget.prototype.onMouseUp = function (point) {
        this.eachChild(function (el) {
            if (el.hitTest(point)) {
                el.onMouseUp(point);
                return true;
            }
            else {
                return false;
            }
        }, false);
    };
    Widget.prototype.onMouseMove = function (point) {
        this.eachChild(function (el) {
            return el.onMouseMove(point);
        }, false);
    };
    // 
    /* virtual */ Widget.prototype.onPaint = function () { };
    ;
    // bottom-up invoke onPaint
    Widget.prototype.redraw = function () {
        this.onPaint();
        this.eachChild(function (el) {
            el.redraw();
        });
    };
    // redraw alias
    Widget.prototype.show = function () {
        this.redraw();
    };
    //
    Widget.prototype.hitTest = function (point) {
        return this.offsetRect.isPointIn(point);
    };
    //
    Widget.prototype.onDestroy = function () {
        this.eachChild(function (el) {
            el.onDestroy();
        });
        this.children = [];
        if (this.parent != null)
            this.parent.removeChild(this);
    };
    return Widget;
}());
exports.default = Widget;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Axis-Parallel Rectangle
var Rect = /** @class */ (function () {
    function Rect(left, top, right, bottom) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this.right - this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this.bottom - this.top;
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.moveBy = function (dx, dy) {
        this.left += dx;
        this.right += dx;
        this.top += dy;
        this.bottom += dy;
    };
    Rect.prototype.moveTo = function (x, y) {
        this.right = x + this.width;
        this.bottom = y + this.height;
        this.left = x;
        this.top = y;
    };
    Rect.prototype.isPointIn = function (point) {
        return this.left <= point.x && this.right > point.x && this.top <= point.y && this.bottom > point.y;
    };
    Rect.prototype.isOverlap = function (rc) {
        return !(this.left >= rc.right || this.right <= rc.left || this.top >= rc.bottom || this.bottom <= rc.top);
    };
    Rect.prototype.equals = function (rc) {
        return this.left == rc.left && this.top == rc.top && this.right == rc.right && this.bottom == rc.bottom;
    };
    Rect.prototype.toString = function () {
        return "[" + this.left + ", " + this.top + ", " + this.right + ", " + this.bottom + "]";
    };
    return Rect;
}());
exports.default = Rect;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __webpack_require__(8);
var Xiangqi = /** @class */ (function () {
    function Xiangqi(canvas) {
        this.canvas = canvas;
        this.manager = new Manager_1.default(canvas);
        this.manager.bind();
    }
    Xiangqi.prototype.newGame = function () {
        if (this.manager != null)
            this.manager.destory();
        this.manager = new Manager_1.default(this.canvas);
        this.manager.bind();
    };
    Xiangqi.prototype.undoMove = function () {
        this.manager.userUndo();
    };
    return Xiangqi;
}());
exports.default = Xiangqi;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(0);
var Point_1 = __webpack_require__(1);
var Board_1 = __webpack_require__(9);
var Piece_1 = __webpack_require__(4);
var Rule_1 = __webpack_require__(2);
var ManagerBase_1 = __webpack_require__(11);
var Board_2 = __webpack_require__(12);
var Message_1 = __webpack_require__(17);
var Setting_1 = __webpack_require__(18);
var IterativeDeepeningNegaScout_TT_HH_1 = __webpack_require__(22);
var SimpleEvaluator_1 = __webpack_require__(27);
var SimpleMoveGenerator_1 = __webpack_require__(29);
var Notation_1 = __webpack_require__(31);
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(canvas) {
        var _this = _super.call(this) || this;
        _this.gameOver = false;
        // data model
        _this.board = new Board_1.default();
        Manager.initialize(_this.board);
        // UI
        _this.UI = new Board_2.default(canvas, Setting_1.default.layout, Setting_1.default.style.board);
        _this.UI.set(_this.board, Setting_1.default.style.piece);
        _this.UI.show();
        // prepare AI
        _this.AI = new IterativeDeepeningNegaScout_TT_HH_1.default();
        // this.AI.setSearchDepth(3);
        _this.AI.setMoveGenerator(new SimpleMoveGenerator_1.default());
        _this.AI.setEvaluator(new SimpleEvaluator_1.default());
        return _this;
    }
    Manager.prototype.bind = function () {
        this.UI.setMessager(this);
    };
    Manager.prototype.doMove = function (move) {
        if (move.from.equals(move.to))
            return;
        console.log(Notation_1.default.notatioin(move, this.board));
        this.board.doMove(move);
        this.judge();
        if (!this.gameOver && this.UI.isCompuer()) {
            this.search(); // start AI search
        }
    };
    Manager.prototype.undoMove = function () {
        console.log("undo");
        this.board.undoMove();
        this.UI.undo();
    };
    // when user click undo botton
    Manager.prototype.userUndo = function () {
        if (this.gameOver && this.UI.isCompuer()) {
            this.undoMove();
            this.unlock();
        }
        else {
            if (this.UI.isCompuer())
                return;
            if (this.gameOver)
                this.unlock();
            this.undoMove(); // undo computer move
            var manager_1 = this;
            var timer_1 = setInterval(function () {
                if (!manager_1.UI.isThreadCompleted)
                    return;
                clearInterval(timer_1);
                manager_1.undoMove(); // undo user move
            }, 100);
        }
    };
    Manager.prototype.destory = function () {
        this.UI.destory();
    };
    Manager.prototype.isLegalMove = function (move) {
        return Rule_1.default.isLegalMove(move, this.board);
    };
    Manager.prototype.isValidPosition = function (pos) {
        return !Rule_1.default.isOutsideBoard(pos);
    };
    Manager.prototype.judge = function () {
        var status = this.board.quickTestStatus();
        switch (status) {
            case define_1.STATUS.Win:
                if (this.UI.isCompuer()) {
                    this.showMessage(Message_1.MESSAGE.LOST);
                }
                else {
                    this.showMessage(Message_1.MESSAGE.WIN);
                }
                break;
            case define_1.STATUS.Lost:
                if (this.UI.isCompuer()) {
                    this.showMessage(Message_1.MESSAGE.WIN);
                }
                else {
                    this.showMessage(Message_1.MESSAGE.LOST);
                }
                break;
            case define_1.STATUS.Draw:
                this.showMessage(Message_1.MESSAGE.DRAW);
                break;
        }
        if (status != define_1.STATUS.NotEnded)
            this.lock();
    };
    Manager.prototype.search = function () {
        var manager = this;
        // wait for UI thread complete
        var timer = setInterval(function () {
            if (!manager.UI.isThreadCompleted)
                return;
            clearInterval(timer);
            var best = manager.AI.searchAGoodMove(manager.board, 10000);
            if (best == null || manager.AI.STATUS != define_1.STATUS.NotEnded) {
                manager.lock();
                if (manager.AI.STATUS == define_1.STATUS.Win) {
                    manager.showMessage(Message_1.MESSAGE.LOST); // user lost
                }
                else {
                    manager.showMessage(Message_1.MESSAGE.RESIGN); // user win
                }
                return;
            }
            manager.UI.update(best);
        }, 100);
    };
    Manager.prototype.lock = function () {
        this.gameOver = true;
        this.UI.lock = true;
    };
    Manager.prototype.unlock = function () {
        this.gameOver = false;
        this.UI.lock = false;
    };
    Manager.prototype.showMessage = function (msg) {
        var manager = this;
        var timer = setInterval(function () {
            if (!manager.UI.isThreadCompleted)
                return;
            clearInterval(timer);
            alert(msg);
        }, 100);
    };
    Manager.initialize = function (board) {
        // init board data model
        board.set(new Point_1.default(4, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.King));
        board.set(new Point_1.default(3, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Guard));
        board.set(new Point_1.default(5, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Guard));
        board.set(new Point_1.default(2, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Bishop));
        board.set(new Point_1.default(6, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Bishop));
        board.set(new Point_1.default(1, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Knight));
        board.set(new Point_1.default(7, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Knight));
        board.set(new Point_1.default(0, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Rook));
        board.set(new Point_1.default(8, 0), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Rook));
        board.set(new Point_1.default(1, 2), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Cannon));
        board.set(new Point_1.default(7, 2), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Cannon));
        board.set(new Point_1.default(0, 3), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(2, 3), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(4, 3), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(6, 3), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(8, 3), new Piece_1.default(board.upSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(4, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.King));
        board.set(new Point_1.default(3, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Guard));
        board.set(new Point_1.default(5, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Guard));
        board.set(new Point_1.default(2, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Bishop));
        board.set(new Point_1.default(6, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Bishop));
        board.set(new Point_1.default(1, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Knight));
        board.set(new Point_1.default(7, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Knight));
        board.set(new Point_1.default(0, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Rook));
        board.set(new Point_1.default(8, 9), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Rook));
        board.set(new Point_1.default(1, 7), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Cannon));
        board.set(new Point_1.default(7, 7), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Cannon));
        board.set(new Point_1.default(0, 6), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(2, 6), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(4, 6), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(6, 6), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Pawn));
        board.set(new Point_1.default(8, 6), new Piece_1.default(board.blewSidePlayer, define_1.PIECE.Pawn));
    };
    return Manager;
}(ManagerBase_1.default));
exports.default = Manager;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __webpack_require__(4);
var BoardBase_1 = __webpack_require__(10);
var Rule_1 = __webpack_require__(2);
var define_1 = __webpack_require__(0);
// abstract logical game board
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // update
    Board.prototype.doMove = function (move) {
        if (move.from.equals(move.to))
            return;
        if (!Rule_1.default.isLegalMove(move, this)) {
            console.log(this.toString());
            console.log(move.toString());
            throw new Error("Invalid Move!");
        }
        var from = move.from, to = move.to;
        var target = this.at(to);
        if (target != null)
            move.attack(target.type);
        this.set(to, this.at(from));
        this.set(from, null);
        this.history.push(move);
        this.switchMover();
    };
    Board.prototype.undoMove = function () {
        if (this.history.length == 0) {
            throw new Error("No previus move!!!");
        }
        var move = this.history.pop();
        if (typeof move != "undefined") {
            var from = move.from, to = move.to;
            this.set(from, this.at(to));
            if (move.target != null) {
                this.set(to, new Piece_1.default(this.currentMover, move.target));
            }
            else {
                this.set(to, null);
            }
            this.switchMover();
        }
    };
    //
    Board.prototype.quickTestStatus = function () {
        return Rule_1.default.quickTestStatus(this);
    };
    //
    Board.prototype.clone = function () {
        var board = new Board();
        board.upSide = this.upSide;
        board.mover = this.mover;
        for (var x = 0; x < define_1.SIZE.files; ++x) {
            for (var y = 0; y < define_1.SIZE.ranks; ++y) {
                var idx = define_1.pos2idx(x, y);
                var piece = this.boardMap[idx];
                if (piece != null) {
                    board.boardMap[idx] = piece.clone();
                }
            }
        }
        return board;
    };
    return Board;
}(BoardBase_1.default));
exports.default = Board;
;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(0);
// basic board with IO
var BoardBase = /** @class */ (function () {
    function BoardBase() {
        this.boardMap = Array.apply(null, Array(define_1.SIZE.files * define_1.SIZE.ranks));
        this.upSide = define_1.PLAYER.Black;
        this.mover = define_1.PLAYER.Red;
        this.history = [];
    }
    BoardBase.prototype.at = function (pos) {
        // this.legalityChecker(pos);
        return this.boardMap[define_1.pos2idx(pos.x, pos.y)];
    };
    BoardBase.prototype.set = function (pos, piece) {
        // this.legalityChecker(pos);
        this.boardMap[define_1.pos2idx(pos.x, pos.y)] = piece;
    };
    BoardBase.prototype.empty = function (pos) {
        // this.legalityChecker(pos);
        return this.boardMap[define_1.pos2idx(pos.x, pos.y)] == null;
    };
    // For robustness, it's necessary, although the arguments is not from users.
    // But for perfomance, it may be omitted, and the legality depends on developers.
    BoardBase.prototype.legalityChecker = function (pos) {
        if (pos.x < 0 || pos.x > define_1.SIZE.files || pos.y < 0 || pos.y > define_1.SIZE.ranks)
            throw RangeError("Out of board!");
        if (Math.round(pos.x) !== pos.x || Math.round(pos.y) !== pos.y)
            throw Error("Must be integer!");
    };
    Object.defineProperty(BoardBase.prototype, "currentMover", {
        get: function () {
            return this.mover;
        },
        enumerable: true,
        configurable: true
    });
    BoardBase.prototype.switchMover = function () {
        this.mover = define_1.opponent(this.mover);
    };
    Object.defineProperty(BoardBase.prototype, "upSidePlayer", {
        get: function () {
            return this.upSide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardBase.prototype, "blewSidePlayer", {
        get: function () {
            return define_1.opponent(this.upSide);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardBase.prototype, "moveHistory", {
        get: function () {
            return this.history;
        },
        enumerable: true,
        configurable: true
    });
    // exchange two players
    BoardBase.prototype.switchSide = function () {
        this.upSide = define_1.opponent(this.upSide);
    };
    // only swap the side of board
    BoardBase.prototype.rotate = function () {
        this.upSide = define_1.opponent(this.upSide);
        var halfBoard = define_1.SIZE.ranks * define_1.SIZE.files / 2;
        this.boardMap = this.boardMap.slice(halfBoard).concat(this.boardMap.slice(0, halfBoard));
    };
    BoardBase.prototype.toString = function () {
        var str = "┌" + Array(define_1.SIZE.files).join("──") + "┐\n";
        for (var y = 0; y < define_1.SIZE.ranks; ++y) {
            str += "│";
            for (var x = 0; x < define_1.SIZE.files; ++x) {
                var piece = this.boardMap[define_1.pos2idx(x, y)];
                if (piece == null)
                    str += "\u3000"; // full width space
                else
                    str += define_1.character(piece.type, piece.owner);
            }
            str += "│\n";
        }
        str += "└" + Array(define_1.SIZE.files).join("──") + "┘\n";
        str += this.currentMover === define_1.PLAYER.Red ? "红方行棋" : "黑方行棋";
        return str;
    };
    return BoardBase;
}());
exports.default = BoardBase;
;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ManagerBase = /** @class */ (function () {
    function ManagerBase() {
    }
    return ManagerBase;
}());
exports.default = ManagerBase;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(1);
var define_1 = __webpack_require__(0);
var BoardBase_1 = __webpack_require__(13);
var Piece_1 = __webpack_require__(15);
var Record_1 = __webpack_require__(16);
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(canvas, layout, style) {
        var _this = _super.call(this, canvas) || this;
        _this.children = [];
        _this.offsetRect.left = 0;
        _this.offsetRect.top = 0;
        _this.offsetRect.right = 460;
        _this.offsetRect.bottom = 510;
        _this.layout = layout;
        _this.style = style;
        return _this;
    }
    // find Piece widget on Board
    Board.prototype.findChess = function (pos) {
        if (!this.messager.isValidPosition(pos))
            return null;
        try {
            for (var _a = __values(this.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var child = _b.value;
                if (child.isAt(pos))
                    return child;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
        var e_1, _c;
    };
    Board.prototype.undo = function () {
        var record = this.history.pop();
        if (typeof record !== "undefined") {
            var piece = this.findChess(record.to);
            if (piece == null)
                throw Error("Piece Not Found!");
            piece.move(record.from);
            // restore killed piece
            if (record.piece != null) {
                this.addChild(record.piece);
                record.piece.move(record.to); // just move inplace and trigger redraw
            }
            this.switchMover();
        }
    };
    // flow: manager (AI, search finished) -> board -> piece & manager
    // flow: piece (user, mouse up) -> board -> piece & manager
    Board.prototype.update = function (move) {
        var piece = this.findChess(move.from);
        var killed = this.findChess(move.to);
        this.history.push(new Record_1.default(move, killed));
        this.removeChess(move.to); // update board
        if (piece == null)
            throw Error("Piece Not Found!");
        piece.move(move.to); // update piece position
        this.switchMover();
        this.messager.doMove(move); // update board model
    };
    Board.prototype.removeChess = function (pos) {
        var piece = this.findChess(pos);
        if (piece != null)
            this.removeChild(piece);
    };
    Board.prototype.onPaint = function () {
        var ctx = this.canvas.getContext('2d');
        if (ctx == null)
            throw Error("Context Type Undefined!");
        var style = this.style;
        var layout = this.layout;
        // background
        ctx.fillStyle = style.background;
        ctx.beginPath();
        ctx.rect(0, 0, layout.offsetWidth, layout.offsetHeight);
        ctx.fill();
        ctx.closePath();
        // lines
        var p = layout.padding, s = layout.cell, w = layout.width, h = layout.height;
        ctx.strokeStyle = style.border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // 10 ranks
        for (var i = 0; i < 10; i++) {
            ctx.moveTo(p, s * i + p);
            ctx.lineTo(w + p, s * i + p);
        }
        // left-most, right-most ranks
        ctx.moveTo(p, p);
        ctx.lineTo(p, h + p);
        ctx.moveTo(w + p, p);
        ctx.lineTo(w + p, h + p);
        // 7 ranks cross river
        for (var i = 1; i < 8; i++) {
            ctx.moveTo(s * i + p, p);
            ctx.lineTo(s * i + p, s * 4 + p);
            ctx.moveTo(s * i + p, s * 5 + p);
            ctx.lineTo(s * i + p, h + p);
        }
        // castle
        ctx.moveTo(s * 3 + p, p);
        ctx.lineTo(s * 5 + p, s * 2 + p);
        ctx.moveTo(s * 5 + p, 0 + p);
        ctx.lineTo(s * 3 + p, s * 2 + p);
        ctx.moveTo(s * 3 + p, s * 7 + p);
        ctx.lineTo(s * 5 + p, s * 9 + p);
        ctx.moveTo(s * 5 + p, s * 7 + p);
        ctx.lineTo(s * 3 + p, s * 9 + p);
        ctx.stroke();
        ctx.closePath();
        // river
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.font = style.font;
        ctx.fillStyle = style.border;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("楚", -(p + s * 4.5), (p + s * 1.5));
        ctx.fillText("河", -(p + s * 4.5), (p + s * 2.5));
        ctx.rotate(Math.PI);
        ctx.fillText("漢", (p + s * 4.5), -(p + s * 6.5));
        ctx.fillText("界", (p + s * 4.5), -(p + s * 5.5));
        ctx.restore();
    };
    Board.prototype.set = function (board, style) {
        var layout = this.layout;
        for (var x = 0; x < define_1.SIZE.files; ++x) {
            for (var y = 0; y < define_1.SIZE.ranks; ++y) {
                var pos = new Point_1.default(x, y);
                var piece = board.at(pos);
                if (piece != null) {
                    new Piece_1.default(this, define_1.character(piece.type, piece.owner), piece.owner, piece.type, pos, layout, style(piece.owner));
                }
            }
        }
    };
    Board.prototype.destory = function () {
        this.onDestroy();
    };
    return Board;
}(BoardBase_1.default));
exports.default = Board;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = __webpack_require__(14);
var Move_1 = __webpack_require__(3);
var define_1 = __webpack_require__(0);
var BoardBase = /** @class */ (function (_super) {
    __extends(BoardBase, _super);
    function BoardBase(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.messager = null;
        _this.human = define_1.PLAYER.Red;
        _this.computer = define_1.PLAYER.Black;
        _this.mover = define_1.PLAYER.Red;
        _this.isThreadCompleted = true;
        _this.lock = false;
        _this.history = [];
        return _this;
    }
    Object.defineProperty(BoardBase.prototype, "currentMover", {
        get: function () {
            return this.mover;
        },
        enumerable: true,
        configurable: true
    });
    BoardBase.prototype.isLegalMove = function (from, to) {
        return this.messager.isLegalMove(new Move_1.default(from.clone(), to.clone()));
    };
    BoardBase.prototype.isCompuer = function () {
        return this.mover === this.computer;
    };
    BoardBase.prototype.switchMover = function () {
        this.mover = define_1.opponent(this.mover);
    };
    BoardBase.prototype.setMessager = function (messager) {
        this.messager = messager;
    };
    return BoardBase;
}(View_1.default));
exports.default = BoardBase;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(1);
var Widget_1 = __webpack_require__(5);
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(canvas) {
        var _this = _super.call(this, null, canvas) || this;
        // trigger mouse event on Widgets, top-down
        // pass browser event into Widgets system
        _this.globalOnMouseDown = function (e) {
            _super.prototype.onMouseDown.call(_this, _this.coordinate(e, _this.canvas));
        };
        _this.globalOnMouseMove = function (e) {
            _super.prototype.onMouseMove.call(_this, _this.coordinate(e, _this.canvas));
        };
        _this.globalOnMouseUp = function (e) {
            _super.prototype.onMouseUp.call(_this, _this.coordinate(e, _this.canvas));
        };
        document.addEventListener("mousedown", _this.globalOnMouseDown);
        document.addEventListener("mousemove", _this.globalOnMouseMove);
        document.addEventListener("mouseup", _this.globalOnMouseUp);
        return _this;
    }
    // mouse coordinate on canvas
    View.prototype.coordinate = function (e, dom) {
        var x = e.pageX - dom.offsetLeft, y = e.pageY - dom.offsetTop;
        return new Point_1.default(x, y);
    };
    return View;
}(Widget_1.default));
exports.default = View;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(1);
var Move_1 = __webpack_require__(3);
var Rect_1 = __webpack_require__(6);
var Widget_1 = __webpack_require__(5);
var Piece = /** @class */ (function (_super) {
    __extends(Piece, _super);
    function Piece(parent, name, owner, type, position, layout, style) {
        var _this = _super.call(this, parent, null) || this;
        _this.name = name;
        _this.type = type;
        _this.owner = owner;
        _this.position = position;
        _this.isDragging = false;
        _this.targetIndicator = null;
        _this.targetIndicatorAlpha = 0.2;
        _this.layout = layout;
        _this.style = style;
        var left = layout.padding + layout.cell * _this.position.x - layout.cell / 2;
        var top = layout.padding + layout.cell * _this.position.y - layout.cell / 2;
        _this.offsetRect = new Rect_1.default(left, top, left + layout.cell, top + layout.cell);
        return _this;
    }
    Piece.prototype.onPaint = function () {
        var layout = this.layout;
        var style = this.style;
        var ctx = this.canvas.getContext('2d');
        if (ctx == null)
            throw Error("Context type undefined!");
        ctx.fillStyle = style.background;
        ctx.strokeStyle = style.border;
        ctx.font = style.font;
        // center
        var x = this.offsetRect.left + layout.cell / 2, y = this.offsetRect.top + layout.cell / 2;
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        // shadow
        if (this.isDragging)
            ctx.arc(x + 2, y + 4, layout.chessRadius + 1, 0, 360);
        else
            ctx.arc(x + 1, y + 2, layout.chessRadius + 1, 0, 360);
        ctx.fill();
        ctx.fillStyle = style.background;
        ctx.closePath();
        // indicator
        if (this.targetIndicator != null && this.targetIndicatorAlpha > 0) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 128, 0, " + this.targetIndicatorAlpha + ")";
            ctx.arc(layout.padding + this.targetIndicator.x * layout.cell, layout.padding + this.targetIndicator.y * layout.cell, layout.cell / 2, 0, 360);
            ctx.fill();
            ctx.fillStyle = style.background;
            ctx.closePath();
        }
        // piece body
        ctx.beginPath();
        ctx.arc(x, y, layout.chessRadius, 0, 360);
        ctx.fill();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = style.font;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(this.name, x + 1, y - layout.fontSize / 16 + 1);
        ctx.fillStyle = style.fontColor;
        ctx.fillText(this.name, x, y - layout.fontSize / 16);
        ctx.stroke();
        ctx.closePath();
    };
    Piece.prototype.onMouseDown = function () {
        if (this.parent.lock)
            return;
        if (!this.parent.isThreadCompleted)
            return; // blocked by other action
        if (this.parent.currentMover == this.owner) {
            this.isDragging = true; // block other action
            this.parent.moveChildToTop(this); // move piece to front
            this.parent.redraw(); // repaint
        }
    };
    Piece.prototype.onMouseMove = function (point) {
        var layout = this.layout;
        if (this.isDragging) {
            if (point.x <= 0 || point.x >= layout.offsetWidth || point.y <= 0 || point.y >= layout.offsetHeight) {
                this.isDragging = false; // if outside board, stop it
                this.moveTo(this.position); // cancle current move
                this.parent.redraw();
                return;
            }
            // left top
            var x = point.x - layout.cell / 2, y = point.y - layout.cell / 2;
            // move
            this.offsetRect.moveTo(x, y);
            // position on board (file, rank)
            var pos = this.point2chessPos(x, y);
            // test rules
            if (this.parent.isLegalMove(this.position, pos))
                this.targetIndicator = pos;
            else
                this.targetIndicator = null;
            // repaint
            this.parent.redraw();
        }
    };
    Piece.prototype.onMouseUp = function () {
        if (this.isDragging) {
            this.isDragging = false;
            if (this.targetIndicator === null) {
                this.moveTo(this.position); // cancle current move
                this.parent.redraw();
                return;
            }
            var pos = this.targetIndicator;
            this.parent.update(new Move_1.default(this.position, pos)); // notice Board to update
        }
    };
    Piece.prototype.move = function (pos) {
        this.targetIndicator = pos;
        this.moveTo(pos);
    };
    Piece.prototype.isAt = function (pos) {
        return pos != null && this.position.equals(pos);
    };
    // canvas coordinate to board (file,rank)
    Piece.prototype.point2chessPos = function (x, y) {
        var layout = this.layout;
        return new Point_1.default(Math.ceil((x - layout.padding) / layout.cell), Math.ceil((y - layout.padding) / layout.cell));
    };
    Piece.prototype.chessPos2point = function (x, y) {
        var layout = this.layout;
        return new Point_1.default(x * layout.cell + layout.padding, y * layout.cell + layout.padding);
    };
    // move a piece
    Piece.prototype.moveTo = function (pos) {
        this.parent.isThreadCompleted = false; // lock mutex
        var layout = this.layout;
        // target
        var left = layout.padding + layout.cell * pos.x - layout.cell / 2, top = layout.padding + layout.cell * pos.y - layout.cell / 2;
        // offset
        var dx = left - this.offsetRect.left, dy = top - this.offsetRect.top;
        // animation
        var t = 0, // time counter, unit: frame
        c = 15, //15 frame, 1 frame = 40ms
        piece = this;
        var timer = setInterval(function () {
            if (++t > c) {
                clearInterval(timer);
                piece.position = pos;
                piece.offsetRect.moveTo(left, top);
                piece.targetIndicator = null;
                piece.targetIndicatorAlpha = 0.2;
                piece.parent.isThreadCompleted = true; // release mutex
                return;
            }
            // t=0，ratio=1; t=c, ratio=0
            var ratio = 0;
            if (t <= c / 2) {
                ratio = 2 * t / c; // 
                ratio = 1 - 0.5 * ratio * ratio * ratio * ratio;
            }
            else {
                ratio = 2 - 2 * t / c;
                ratio = 0.5 * ratio * ratio * ratio * ratio;
            }
            piece.offsetRect.moveTo(left - dx * ratio, top - dy * ratio);
            piece.targetIndicatorAlpha = 0.2 * ratio;
            piece.parent.redraw();
        }, 40);
        // update position
        this.position = pos;
    };
    return Piece;
}(Widget_1.default));
exports.default = Piece;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// something very similar to Move but used in Board UI
var Record = /** @class */ (function () {
    function Record(move, piece) {
        if (piece === void 0) { piece = null; }
        this.from = move.from.clone();
        this.to = move.to.clone();
        this.piece = piece;
    }
    return Record;
}());
exports.default = Record;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MESSAGE;
(function (MESSAGE) {
    MESSAGE["RESIGN"] = "Resign. You won!!!";
    MESSAGE["WIN"] = "Congratulations, You won!!!";
    MESSAGE["LOST"] = "Sorry, you have lost the game.";
    MESSAGE["DRAW"] = "Well, the game is drawn.";
})(MESSAGE = exports.MESSAGE || (exports.MESSAGE = {}));
;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(0);
var Layout_1 = __webpack_require__(19);
var BoardStyle_1 = __webpack_require__(20);
var PieceStyle_1 = __webpack_require__(21);
var Setting = /** @class */ (function () {
    function Setting() {
    }
    // position and size
    Setting.layout = new Layout_1.default(30, 50, 20, 36, 400, 450, 460, 510);
    // color and font
    Setting.style = {
        board: new BoardStyle_1.default("#630", "#fed", "36px DFKai-SB, STKaiti"),
        piece: function (owner) {
            switch (owner) {
                case define_1.PLAYER.Red:
                    return new PieceStyle_1.default("#fa8", "#fc9", "36px DFKai-SB, STKaiti", "#c00");
                case define_1.PLAYER.Black:
                    return new PieceStyle_1.default("#fa8", "#fc9", "36px DFKai-SB, STKaiti", "#090");
            }
        }
    };
    return Setting;
}());
exports.default = Setting;
;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Layout = /** @class */ (function () {
    function Layout(padding, cell, chessRadius, fontSize, width, height, offsetWidth, offsetHeight) {
        this.padding = padding;
        this.cell = cell;
        this.chessRadius = chessRadius;
        this.fontSize = fontSize;
        this.width = width;
        this.height = height;
        this.offsetWidth = offsetWidth;
        this.offsetHeight = offsetHeight;
    }
    return Layout;
}());
exports.default = Layout;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BoardStyle = /** @class */ (function () {
    function BoardStyle(border, background, font) {
        this.border = border;
        this.background = background;
        this.font = font;
    }
    return BoardStyle;
}());
exports.default = BoardStyle;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PieceStyle = /** @class */ (function () {
    function PieceStyle(border, background, font, fontColor) {
        this.border = border;
        this.background = background;
        this.font = font;
        this.fontColor = fontColor;
    }
    return PieceStyle;
}());
exports.default = PieceStyle;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SearchEngine_1 = __webpack_require__(23);
var HistoryHeuristic_1 = __webpack_require__(24);
var TranspositionTable_1 = __webpack_require__(25);
var tools_1 = __webpack_require__(26);
// NegaScout with history heuristic, transposition table and iterative deepening improvement
var IterativeDeepeningNegaScout_TT_HH = /** @class */ (function (_super) {
    __extends(IterativeDeepeningNegaScout_TT_HH, _super);
    function IterativeDeepeningNegaScout_TT_HH() {
        var _this = _super.call(this) || this;
        _this.timeStart = 0; // time in milliseconds
        _this.timeLimit = 0;
        _this.currentMaxDepth = 0; // iterative deepening
        _this.timeOut = false; // terminate search
        _this.backupBestMove = null;
        _this.backupScore = 0;
        _this.TT = new TranspositionTable_1.TranspositionTable(20);
        _this.HH = new HistoryHeuristic_1.default();
        return _this;
    }
    IterativeDeepeningNegaScout_TT_HH.prototype.searchAGoodMove = function (board, timeLimit) {
        console.log(board.toString());
        this.timeOut = false;
        this.timeStart = (new Date()).getTime();
        this.timeLimit = timeLimit;
        this.bestMove = null;
        this.backupBestMove = null;
        this.maxDepth = 1;
        while (!this.timeOut) {
            this.bestMove = null;
            this.HH.clear();
            this.TT.hash(board);
            this.currentBoard = board.clone();
            var score = this.negascout(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
            if (this.timeOut)
                break;
            this.backupScore = score;
            if (this.bestMove != null)
                this.backupBestMove = this.bestMove.clone();
            this.maxDepth += 1;
        }
        this.setStatus(this.backupScore);
        console.log("score:" + this.backupScore);
        console.log("time:" + (new Date().getTime() - this.timeStart).toString() + "ms");
        console.log("depth:" + (this.maxDepth - 1));
        return this.backupBestMove;
    };
    IterativeDeepeningNegaScout_TT_HH.prototype.negascout = function (depth, alpha, beta) {
        var _this = this;
        if (this.timeOut)
            return 0; // time out
        if (new Date().getTime() - this.timeStart >= this.timeLimit) {
            this.timeOut = true;
            return 0;
        }
        ;
        var isOwn = ((this.maxDepth - depth) % 2 == 0);
        var score = this.quickEvaluate(this.maxDepth - depth);
        if (score != 0)
            return score; // terminal node
        // look-up in transposition table
        var item = this.TT.lookup(alpha, beta, depth, isOwn);
        if (item != null)
            return item.score;
        if (depth <= 0) {
            score = this.evaluator.evaluate(this.currentBoard);
            this.TT.update(TranspositionTable_1.ENTRYTYPE.Exact, score, depth, isOwn);
            return score;
        }
        var possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) {
            return this.stalemate(this.maxDepth - depth);
        }
        // adjust order according to history 
        tools_1.mergeSort(possible, function (a, b) { return _this.HH.get(a) > _this.HH.get(b); });
        var isFirstNode = true;
        // suppose fail low, for all chindren, score < alpha
        // alpha will not be updated by score, and finally alpha is the upper bound of score
        var entryType = TranspositionTable_1.ENTRYTYPE.UpperBound;
        try {
            for (var possible_1 = __values(possible), possible_1_1 = possible_1.next(); !possible_1_1.done; possible_1_1 = possible_1.next()) {
                var move = possible_1_1.value;
                // update hash key
                var piece = this.currentBoard.at(move.from);
                if (piece == null)
                    throw Error("Invalid Move!");
                var target = this.currentBoard.at(move.to);
                this.TT.hashMove(move, piece, target);
                // simulate
                this.doMove(move);
                if (isFirstNode) {
                    score = -this.negascout(depth - 1, -beta, -alpha);
                    isFirstNode = false;
                }
                else {
                    score = -this.negascout(depth - 1, -(alpha + 1), -alpha); // search with a null window
                    if (alpha < score && score < beta) {
                        score = -this.negascout(depth - 1, -beta, -score); // do a narrow window re-search
                        // alpha = score satisfying the inequality alpha (passed in) < score < beta is an exact value
                        entryType = TranspositionTable_1.ENTRYTYPE.Exact;
                    }
                }
                this.TT.hashUndoMove(move, piece, target);
                this.undoMove();
                if (score > alpha) {
                    alpha = score;
                    if (depth == this.maxDepth) {
                        this.bestMove = move.clone();
                    }
                }
                if (alpha > beta) {
                    // alpha = score > beta, the real score is not in range [alpha (passed in), beta]
                    // the score is greater than beta, and alpha (current) is the lower boud of score
                    entryType = TranspositionTable_1.ENTRYTYPE.LowerBound;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (possible_1_1 && !possible_1_1.done && (_a = possible_1.return)) _a.call(possible_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.TT.update(entryType, alpha, depth, isOwn);
        if (this.bestMove != null) {
            this.HH.update(this.bestMove, this.currentMaxDepth - depth);
        }
        return alpha;
        var e_1, _a;
    };
    return IterativeDeepeningNegaScout_TT_HH;
}(SearchEngine_1.default));
exports.default = IterativeDeepeningNegaScout_TT_HH;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(0);
var SearchEngine = /** @class */ (function () {
    function SearchEngine() {
        this.maxDepth = 3;
        this.bestMove = null;
        this.status = define_1.STATUS.NotEnded;
        this.resignStep = 1;
        this.winStep = 0;
        this.searchNodes = 0; // only for log
    }
    Object.defineProperty(SearchEngine.prototype, "STATUS", {
        get: function () {
            return this.status;
        },
        enumerable: true,
        configurable: true
    });
    SearchEngine.prototype.setSearchDepth = function (depth) {
        this.maxDepth = depth;
    };
    SearchEngine.prototype.setEvaluator = function (evaluator) {
        this.evaluator = evaluator;
    };
    SearchEngine.prototype.setMoveGenerator = function (generator) {
        this.generator = generator;
    };
    SearchEngine.prototype.doMove = function (move) {
        this.currentBoard.doMove(move);
    };
    SearchEngine.prototype.undoMove = function () {
        this.currentBoard.undoMove();
    };
    SearchEngine.prototype.quickEvaluate = function (depth) {
        // depth = distance from root
        // depth=0, 2, 4, 6,...: self;
        // depth=1, 3, 5, 7,...: oppenent
        var status = this.currentBoard.quickTestStatus();
        switch (status) {
            case define_1.STATUS.Win:
                return this.evaluator.win(depth); // depth small first, win
            case define_1.STATUS.Lost:
                return this.evaluator.lost(depth); // lost
            case define_1.STATUS.FlyCheck:
                // Notice: If search engine can find out fly check as early as possible,
                // the fly check found must be caused by oppenent, because the fly check
                // by self should be tested in previous search.
                return this.evaluator.win(depth);
            case define_1.STATUS.Impossbile:
                throw new Error("Impossible!");
        }
        return 0; // STATUS.NotEnded
    };
    SearchEngine.prototype.stalemate = function (step) {
        return this.evaluator.lost(step);
    };
    SearchEngine.prototype.setStatus = function (score) {
        if (this.evaluator.isWin(score, this.winStep))
            this.status = define_1.STATUS.Win;
        else if (this.evaluator.isLost(score, this.resignStep))
            this.status = define_1.STATUS.Lost;
        else
            this.status = define_1.STATUS.NotEnded;
    };
    return SearchEngine;
}());
exports.default = SearchEngine;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(0);
// The History Heuristic and Alpha - Beta Search Enhancements in Practice, Jonathan Schaeffer, 1989
var HistoryHeuristic = /** @class */ (function () {
    function HistoryHeuristic() {
        // 90 * 90 matrix with 0
        this.historyTable = Array.apply(null, Array(define_1.SIZE.files * define_1.SIZE.ranks)).map(function () {
            return Array.apply(null, Array(define_1.SIZE.files * define_1.SIZE.ranks)).map(function () { return 0; });
        });
        this.targetBuff = new Array();
    }
    HistoryHeuristic.prototype.clear = function () {
        this.historyTable.map(function (row) { return row.map(function () { return 0; }); });
    };
    HistoryHeuristic.prototype.get = function (move) {
        var from = define_1.pos2idx(move.from.x, move.from.y), to = define_1.pos2idx(move.to.x, move.to.y);
        return this.historyTable[from][to];
    };
    HistoryHeuristic.prototype.update = function (move, depth) {
        var from = define_1.pos2idx(move.from.x, move.from.y), to = define_1.pos2idx(move.to.x, move.to.y);
        this.historyTable[from][to] += 2 << depth; // a value recommand by Schaeffer
    };
    return HistoryHeuristic;
}());
exports.default = HistoryHeuristic;
;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(0);
var Point_1 = __webpack_require__(1);
var ENTRYTYPE;
(function (ENTRYTYPE) {
    ENTRYTYPE[ENTRYTYPE["Exact"] = 0] = "Exact";
    ENTRYTYPE[ENTRYTYPE["LowerBound"] = 1] = "LowerBound";
    ENTRYTYPE[ENTRYTYPE["UpperBound"] = 2] = "UpperBound";
})(ENTRYTYPE = exports.ENTRYTYPE || (exports.ENTRYTYPE = {}));
;
var Item = /** @class */ (function () {
    function Item(checkSum, entryType, score, depth) {
        this.checkSum = [checkSum[0], checkSum[1]]; // by value, instead of by reference
        this.entryType = entryType;
        this.score = score;
        this.depth = depth;
    }
    return Item;
}());
exports.Item = Item;
;
// Zobrist hashing
var TranspositionTable = /** @class */ (function () {
    function TranspositionTable(size) {
        this.size = 0; // size in bit
        this.hashKey32 = 0;
        this.hashKey32Table = [];
        this.hashKey64 = [0, 0];
        this.hashKey64Table = [];
        this.transposition = [[], []]; // for self, and oppenent
        this.size = size;
        this.initializeHashKey();
    }
    TranspositionTable.prototype.rand32 = function () {
        return Math.floor(Math.random() * ~(1 << 31));
    };
    TranspositionTable.prototype.rand64 = function () {
        return [this.rand32(), this.rand32()];
    };
    // base value for (piece, file, rank)
    TranspositionTable.prototype.initializeHashKey = function () {
        this.hashKey32Table = new Array(14);
        this.hashKey64Table = new Array(14);
        for (var i = 0; i < 14; ++i) {
            this.hashKey32Table[i] = new Array(define_1.SIZE.files);
            this.hashKey64Table[i] = new Array(define_1.SIZE.files);
            for (var j = 0; j < define_1.SIZE.files; ++j) {
                this.hashKey32Table[i][j] = new Array(define_1.SIZE.ranks);
                this.hashKey64Table[i][j] = new Array(define_1.SIZE.ranks);
                for (var k = 0; k < define_1.SIZE.ranks; ++k) {
                    this.hashKey32Table[i][j][k] = this.rand32();
                    this.hashKey64Table[i][j][k] = this.rand64();
                }
            }
        }
        this.transposition = [new Array(1 << this.size), new Array(1 << this.size)];
        for (var i = 0; i < (1 << this.size); ++i) {
            this.transposition[0][i] = null;
            this.transposition[1][i] = null;
        }
    };
    TranspositionTable.prototype.getPieceIndex = function (piece) {
        var idx;
        switch (piece.type) {
            case define_1.PIECE.King:
                idx = 0;
                break;
            case define_1.PIECE.Guard:
                idx = 1;
                break;
            case define_1.PIECE.Bishop:
                idx = 2;
                break;
            case define_1.PIECE.Knight:
                idx = 3;
                break;
            case define_1.PIECE.Rook:
                idx = 4;
                break;
            case define_1.PIECE.Cannon:
                idx = 5;
                break;
            case define_1.PIECE.Pawn:
                idx = 6;
                break;
            default: throw Error("Unknown Piece Type");
        }
        return piece.owner == define_1.PLAYER.Red ? idx * 2 : idx * 2 + 1;
    };
    TranspositionTable.prototype.hash = function (board) {
        this.hashKey32 = 0;
        this.hashKey64 = [0, 0];
        var pos = new Point_1.default(0, 0);
        for (var j = 0; j < define_1.SIZE.files; ++j) {
            for (var k = 0; k < define_1.SIZE.ranks; ++k) {
                pos.moveTo(j, k);
                var piece = board.at(pos);
                if (piece == null)
                    continue;
                var idx = this.getPieceIndex(piece);
                this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][j][k];
                this.hashKey64 = [
                    this.hashKey64[0] ^ this.hashKey64Table[idx][j][k][0],
                    this.hashKey64[1] ^ this.hashKey64Table[idx][j][k][1]
                ];
            }
        }
    };
    //  incremental hash
    TranspositionTable.prototype.hashMove = function (move, piece, target) {
        var idx = this.getPieceIndex(piece);
        this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.from.x][move.from.y];
        this.hashKey64 = [
            this.hashKey64[0] ^ this.hashKey64Table[idx][move.from.x][move.from.y][0],
            this.hashKey64[1] ^ this.hashKey64Table[idx][move.from.x][move.from.y][1]
        ];
        if (target != null) {
            idx = this.getPieceIndex(target);
            this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.to.x][move.to.y];
            this.hashKey64 = [
                this.hashKey64[0] ^ this.hashKey64Table[idx][move.to.x][move.to.y][0],
                this.hashKey64[1] ^ this.hashKey64Table[idx][move.to.x][move.to.y][1]
            ];
        }
    };
    // Notice: Here we do not use move and board(by reference) to find target piece,
    // because such a method depends on the order of board.undoMove() and this.hashUndoMove().
    // Function hashUndoMove() can not know if board.undoMove already changed board information or not.
    TranspositionTable.prototype.hashUndoMove = function (move, piece, target) {
        var idx;
        if (target != null) {
            idx = this.getPieceIndex(target);
            this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.to.x][move.to.y];
            this.hashKey64 = [
                this.hashKey64[0] ^ this.hashKey64Table[idx][move.to.x][move.to.y][0],
                this.hashKey64[1] ^ this.hashKey64Table[idx][move.to.x][move.to.y][1]
            ];
        }
        idx = this.getPieceIndex(piece);
        this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.from.x][move.from.y];
        this.hashKey64 = [
            this.hashKey64[0] ^ this.hashKey64Table[idx][move.from.x][move.from.y][0],
            this.hashKey64[1] ^ this.hashKey64Table[idx][move.from.x][move.from.y][1]
        ];
    };
    TranspositionTable.prototype.lookup = function (alpha, beta, depth, isOwn) {
        var mask = (1 << this.size) - 1;
        var key = this.hashKey32 & mask;
        var pht = this.transposition[isOwn ? 0 : 1][key];
        if (pht == null)
            return null; // not found
        if (pht.depth >= depth && (pht.checkSum[0] == this.hashKey64[0] &&
            pht.checkSum[1] == this.hashKey64[1])) {
            switch (pht.entryType) {
                case ENTRYTYPE.Exact:
                    return pht;
                case ENTRYTYPE.LowerBound:
                    if (pht.score >= beta)
                        return pht;
                    break;
                case ENTRYTYPE.UpperBound:
                    if (pht.score <= alpha)
                        return pht;
                    break;
            }
        }
        return null; // not found
    };
    TranspositionTable.prototype.update = function (type, score, depth, isOwn) {
        var mask = (1 << this.size) - 1;
        var key = this.hashKey32 & mask;
        this.transposition[isOwn ? 0 : 1][key] = new Item(this.hashKey64, type, score, depth);
    };
    return TranspositionTable;
}());
exports.TranspositionTable = TranspositionTable;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function mergeSort(source, compare) {
    var s = 1, n = source.length;
    var buff = new Array(n);
    while (s < n) {
        mergeAll(source, buff, s, n, compare);
        s += s;
        mergeAll(buff, source, s, n, compare);
        s += s;
    }
}
exports.mergeSort = mergeSort;
// merge [l, m] and [m+1, r]
function merge(source, target, l, m, r, compare) {
    var i = l, j = m + 1, k = l;
    while ((i <= m) && (j <= r))
        if (compare(source[i], source[j]))
            target[k++] = source[i++];
        else
            target[k++] = source[j++];
    if (i > m)
        for (var q = j; q <= r; ++q)
            target[k++] = source[q];
    else
        for (var q = i; q <= m; ++q)
            target[k++] = source[q];
}
function mergeAll(source, target, s, n, compare) {
    var i = 0;
    while (i <= n - 2 * s) {
        merge(source, target, i, i + s - 1, i + 2 * s - 1, compare);
        i = i + 2 * s;
    }
    if (i + s < n)
        merge(source, target, i, i + s - 1, n - 1, compare);
    else
        for (var j = i; j <= n - 1; ++j)
            target[j] = source[j];
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Evaluator_1 = __webpack_require__(28);
var Point_1 = __webpack_require__(1);
var Rule_1 = __webpack_require__(2);
var define_1 = __webpack_require__(0);
// score:
// -20000, already lost
// ...,
// -19901, lost after n-1 steps
// -19900, lost after n steps
// -19899, almost lost
// ...
// 0,
// ...
// 19899, almost win
// 19900, win after n steps
// 19901, win after n-1 steps
// ...
// 20000, already win
var SimpleEvaluator = /** @class */ (function (_super) {
    __extends(SimpleEvaluator, _super);
    function SimpleEvaluator() {
        var _this = _super.call(this) || this;
        _this.threshold = 19900;
        _this.maxSearchDepth = 100;
        return _this;
    }
    ;
    SimpleEvaluator.prototype.evaluate = function (board) {
        // fisrt round scanning : statistics (per piece)
        // 1. how many pieces guard this piece
        // 2. how many pieces threat this piece
        // 3. how many poosible moves of this piece
        var attack = Array.apply(null, Array(define_1.SIZE.files * define_1.SIZE.ranks)).map(function () { return 0; });
        var guard = Array.apply(null, Array(define_1.SIZE.files * define_1.SIZE.ranks)).map(function () { return 0; });
        var flexibility = Array.apply(null, Array(define_1.SIZE.files * define_1.SIZE.ranks)).map(function () { return 0; });
        var possible = Rule_1.default.getPossibleMoves(board, false);
        try {
            for (var possible_1 = __values(possible), possible_1_1 = possible_1.next(); !possible_1_1.done; possible_1_1 = possible_1.next()) {
                var move = possible_1_1.value;
                var from = define_1.pos2idx(move.from.x, move.from.y);
                var to = define_1.pos2idx(move.to.x, move.to.y);
                if (move.protege != null) {
                    guard[to] += 1;
                }
                else if (move.target !== null) {
                    var attacker = board.at(move.from);
                    var attackee = board.at(move.to);
                    if (attacker == null || attackee == null)
                        throw Error("Piece Not Found!");
                    attack[to] += 3 + Math.floor(0.01 * (SimpleEvaluator.baseValue(attackee.type) - SimpleEvaluator.baseValue(attacker.type)));
                    // checkmate
                    if (attackee.type === define_1.PIECE.King) {
                        // owner can do nothing
                        if (board.currentMover !== attackee.owner) {
                            return this.WIN;
                        }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (possible_1_1 && !possible_1_1.done && (_a = possible_1.return)) _a.call(possible_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // second round scanning : score
        // 1. base, flexibility, extra value related to position
        // 2. threat, guard
        var self = 0;
        var opponent = 0;
        for (var x = 0; x < define_1.SIZE.files; ++x) {
            for (var y = 0; y < define_1.SIZE.ranks; ++y) {
                var piece = board.at(new Point_1.default(x, y));
                if (piece == null)
                    continue;
                var pos = define_1.pos2idx(x, y);
                var pieceValue = 0;
                // Part 1: value of piece itself
                pieceValue += SimpleEvaluator.baseValue(piece.type); // 1. base value
                pieceValue += SimpleEvaluator.flexibility(piece.type) * flexibility[pos]; // 2. flexibility
                if (piece.type === define_1.PIECE.Pawn) {
                    pieceValue += SimpleEvaluator.extraPawnValue(board, piece.owner, new Point_1.default(x, y)); // 3. extra value depends on position
                }
                // Part 2: adjust value according to relationships with other pieces
                var unit = Math.floor(SimpleEvaluator.baseValue(piece.type) / 16);
                if (attack[pos] > 0) {
                    if (board.currentMover === piece.owner) {
                        if (piece.type === define_1.PIECE.King) {
                            pieceValue -= 20; // state of emergency, must remove the threat immediately
                        }
                        else {
                            pieceValue -= 2 * unit; // the threat vaules 2 unit
                            if (guard[pos] > 0)
                                pieceValue += unit; // guarded by others, decrease the threat
                        }
                    }
                    else {
                        if (piece.type === define_1.PIECE.King) {
                            return this.WIN;
                        }
                        pieceValue -= 10 * unit; // attack, the threat vaules 10 unit
                        if (guard[pos] > 0)
                            pieceValue += 9 * unit; // guarded by others, decrease the threat
                    }
                    // More threat with capture, less chance for survival,
                    // which is for exchange evaluation.
                    pieceValue -= attack[pos];
                }
                else {
                    // If a piece is only guarded by others without threat from others,
                    // the active defense should increase safety a little.
                    if (guard[pos] > 0)
                        pieceValue += 5;
                }
                if (piece.isOwnedBy(board.currentMover)) {
                    self += pieceValue;
                }
                else {
                    opponent += pieceValue;
                }
            }
        }
        return self - opponent;
        var e_1, _a;
    };
    SimpleEvaluator.baseValue = function (piece) {
        switch (piece) {
            case define_1.PIECE.Pawn: return 100;
            case define_1.PIECE.Guard: return 200;
            case define_1.PIECE.Bishop: return 200;
            case define_1.PIECE.Rook: return 900;
            case define_1.PIECE.Knight: return 400;
            case define_1.PIECE.Cannon: return 450;
            case define_1.PIECE.King: return 10000;
        }
    };
    // value of each reachable position
    SimpleEvaluator.flexibility = function (piece) {
        switch (piece) {
            case define_1.PIECE.Pawn: return 15;
            case define_1.PIECE.Guard: return 1;
            case define_1.PIECE.Bishop: return 1;
            case define_1.PIECE.Rook: return 6;
            case define_1.PIECE.Knight: return 12;
            case define_1.PIECE.Cannon: return 6;
            case define_1.PIECE.King: return 0;
        }
    };
    // extra value for pawn
    SimpleEvaluator.extraPawnValue = function (board, owner, pos) {
        var value = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [70, 70, 70, 70, 70, 70, 70, 70, 70],
            [70, 90, 110, 110, 110, 110, 110, 90, 70],
            [90, 90, 110, 120, 120, 120, 110, 90, 90],
            [90, 90, 110, 120, 120, 120, 110, 90, 90],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        if (owner === board.upSidePlayer)
            return value[pos.x][pos.y];
        else
            return value[pos.x][define_1.SIZE.ranks - pos.y];
    };
    return SimpleEvaluator;
}(Evaluator_1.default));
exports.default = SimpleEvaluator;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// score
// -(threshold+maxSearchDepth), already lost
// ...,
// -(threshold+1), lost after n-1 steps
// -threshold, lost after n steps
// -(threshold-1), almost lost
// ...
// 0,
// ...
// threshold-1, almost win
// threshold, win after n steps
// threshold+1, win after n-1 steps
// ...
// threshold+maxSearchDepth, already win
var Evaluator = /** @class */ (function () {
    function Evaluator() {
        this.threshold = 0;
        this.maxSearchDepth = 0;
    }
    Object.defineProperty(Evaluator.prototype, "WIN", {
        get: function () {
            return this.threshold + this.maxSearchDepth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Evaluator.prototype, "LOST", {
        get: function () {
            return -(this.threshold + this.maxSearchDepth);
        },
        enumerable: true,
        configurable: true
    });
    Evaluator.prototype.win = function (step) {
        return this.threshold + this.maxSearchDepth - step;
    };
    Evaluator.prototype.lost = function (step) {
        return -(this.threshold + this.maxSearchDepth - step);
    };
    Evaluator.prototype.isWin = function (score, step) {
        return score >= this.threshold + this.maxSearchDepth - step;
    };
    Evaluator.prototype.isLost = function (score, step) {
        return score <= -(this.threshold + this.maxSearchDepth - step);
    };
    return Evaluator;
}());
exports.default = Evaluator;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = __webpack_require__(2);
var MoveGenerator_1 = __webpack_require__(30);
var SimpleMoveGenerator = /** @class */ (function (_super) {
    __extends(SimpleMoveGenerator, _super);
    function SimpleMoveGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleMoveGenerator.prototype.getPossibleMoves = function (board) {
        return Rule_1.default.getPossibleMoves(board, true);
    };
    return SimpleMoveGenerator;
}(MoveGenerator_1.default));
exports.default = SimpleMoveGenerator;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MoveGenerator = /** @class */ (function () {
    function MoveGenerator() {
    }
    return MoveGenerator;
}());
exports.default = MoveGenerator;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(1);
var define_1 = __webpack_require__(0);
var Notation = /** @class */ (function () {
    function Notation() {
    }
    Notation.notatioin = function (move, board) {
        var piece = board.at(move.from);
        if (piece == null)
            throw Error("Piece Not Found!");
        return this.getUniquePieceName(move.from, piece, board) + this.getActionName(move, piece, board);
    };
    Notation.getUniquePieceName = function (pos, piece, board) {
        var name = define_1.character(piece.type, piece.owner);
        if (piece.type == define_1.PIECE.King)
            return name + Notation.getFileName(pos, piece, board);
        var ys = [];
        var p = new Point_1.default(pos.x, 0);
        for (; p.y < define_1.SIZE.ranks; p.y += 1) {
            var pi = board.at(p);
            if (pi == null)
                continue;
            if (piece.equals(pi))
                ys.push(p.y);
        }
        if (ys.length == 1) {
            return name + Notation.getFileName(pos, piece, board);
        }
        if (ys.length == 2) {
            if (ys[0] === pos.y) {
                if (piece.isOwnedBy(board.upSidePlayer))
                    return "前" + name;
                else
                    return "後" + name;
            }
            else {
                if (piece.isOwnedBy(board.blewSidePlayer))
                    return "前" + name;
                else
                    return "後" + name;
            }
        }
        // more than 2, must be pawn
        // check if other files have more than one pawn
        var otherFileWithMultiplePawn = false;
        for (var x = 0; x < define_1.SIZE.files; ++x) {
            if (x == pos.x)
                continue;
            var count = 0;
            for (var y = 0; y < define_1.SIZE.ranks; ++y) {
                var p_1 = board.at(new Point_1.default(x, y));
                if (p_1 == null)
                    continue;
                if (piece.equals(p_1)) {
                    ++count;
                    if (count >= 2) {
                        otherFileWithMultiplePawn = true;
                        break;
                    }
                }
            }
        }
        if (otherFileWithMultiplePawn) {
            name = Notation.getFileName(pos, piece, board);
        }
        var len = ys.length;
        if (ys[0] === pos.y) {
            if (piece.isOwnedBy(board.upSidePlayer))
                return "前" + name;
            else
                return "後" + name;
        }
        else if (ys[len - 1] === pos.y) {
            if (piece.isOwnedBy(board.blewSidePlayer))
                return "前" + name;
            else
                return "後" + name;
        }
        else if (ys.length === 3) {
            return "中" + name;
        }
        else {
            if (piece.isOwnedBy(board.upSidePlayer)) {
                if (ys[1] == pos.y)
                    return "二" + name;
                if (ys[2] == pos.y)
                    return "三" + name;
                if (ys[3] == pos.y)
                    return "四" + name;
            }
            else {
                if (ys[len - 2] == pos.y)
                    return "二" + name;
                if (ys[len - 3] == pos.y)
                    return "三" + name;
                if (ys[len - 4] == pos.y)
                    return "四" + name;
            }
        }
        throw Error("Impossible Piece Type!");
    };
    // From thier own view, number files from right to left. 
    // Red use Chinese number, Black use Arabic number.
    Notation.getFileName = function (pos, piece, board) {
        if (piece.isOwnedBy(board.upSidePlayer)) {
            if (piece.owner === define_1.PLAYER.Red)
                return Notation.ChineseNumber[pos.x];
            else
                return Notation.ArabicNumber[pos.x];
        }
        else {
            if (piece.owner === define_1.PLAYER.Red)
                return Notation.ChineseNumber[define_1.SIZE.files - pos.x - 1];
            else
                return Notation.ArabicNumber[define_1.SIZE.files - pos.x - 1];
        }
    };
    Notation.getActionName = function (move, piece, board) {
        if (move.from.y == move.to.y) {
            return "平" + Notation.getFileName(move.to, piece, board);
        }
        var actionArg;
        if (piece.type == define_1.PIECE.Guard || piece.type == define_1.PIECE.Bishop || piece.type == define_1.PIECE.Knight) {
            actionArg = Notation.getFileName(move.to, piece, board);
        }
        else {
            var steps = Math.abs(move.from.y - move.to.y);
            if (piece.owner == define_1.PLAYER.Red)
                actionArg = Notation.ChineseNumber[steps - 1];
            else
                actionArg = Notation.ArabicNumber[steps - 1];
        }
        if (piece.isOwnedBy(board.upSidePlayer)) {
            if (move.from.y < move.to.y)
                return "進" + actionArg;
            else
                return "退" + actionArg;
        }
        else {
            if (move.from.y > move.to.y)
                return "進" + actionArg;
            else
                return "退" + actionArg;
        }
    };
    Notation.ArabicNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    Notation.ChineseNumber = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    return Notation;
}());
exports.default = Notation;


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=xiangqi.js.map