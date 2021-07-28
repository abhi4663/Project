"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
var userSchema_1 = __importDefault(require("../models/userSchema"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, user_1, err_1, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userSchema_1.default.create({
                        name: name_1,
                        email: email,
                        password: password,
                    })];
            case 2:
                user_1 = _b.sent();
                bcryptjs_1.default.genSalt(10, function (err, salt) {
                    bcryptjs_1.default.hash(user_1.password, salt, function (err, hash) {
                        if (err) {
                            return res
                                .status(404)
                                .send({ message: 'Error while hashing password' });
                        }
                        user_1.password = hash;
                        user_1.save().then(function (user) {
                            res.send(user);
                        });
                    });
                });
                res
                    .status(200)
                    .json({ success: true, message: 'Registration successful', user: user_1 });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                res.status(404).send({
                    success: false,
                    message: err_1.message,
                });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _b.sent();
                console.log("from register err.message", err_2.message);
                res.status(404).send({
                    success: false,
                    message: 'Error in Register User',
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password_1;
    return __generator(this, function (_b) {
        try {
            _a = req.body, email = _a.email, password_1 = _a.password;
            if (!email || !password_1) {
                return [2 /*return*/, res
                        .status(400)
                        .json({ message: 'credentials are not matched', success: false })];
            }
            userSchema_1.default.findOne({ email: email }).then(function (user) {
                if (!user) {
                    return res
                        .status(400)
                        .json({ message: 'user does not exists', success: false });
                }
                //validate password
                bcryptjs_1.default.compare(password_1, user.password).then(function (isMatch) {
                    //   if (!isMatch) return res.status(400).json({ message: "invalid credentials" });
                    if (!isMatch) {
                        return res
                            .status(401)
                            .send({ message: 'Password is not matched', success: false });
                    }
                    jsonwebtoken_1.default.sign({ id: user._id }, 'Abhi18', { expiresIn: '1d' }, function (err, token) {
                        if (err) {
                            return res
                                .status(404)
                                .send({ message: 'token expired', success: false });
                        }
                        return res.status(200).send({
                            user: {
                                name: user.name,
                                email: user.email,
                            },
                            token: token,
                            message: 'Successfully logged-in',
                            success: true,
                        });
                    });
                });
            });
        }
        catch (err) {
            res.status(404).send({
                success: false,
                message: 'Error while logging User',
            });
        }
        return [2 /*return*/];
    });
}); };
exports.loginUser = loginUser;
// export const getUsers = async (req: any, res: any) => {
//   try {
//     const Notes = await Note.find();
//     res.status(200).json(Notes);
//   } catch (err: any) {
//     res.status(404).json({ err: err.message, success: false });
//   }
// };
