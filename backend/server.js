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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var multer_1 = require("multer");
var path_1 = require("path");
var csv_parser_1 = require("csv-parser");
var fs_1 = require("fs");
var uid_1 = require("uid");
var app = (0, express_1.default)();
var storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
        var ext = path_1.default.extname(file.originalname);
        callback(null, "".concat(path_1.default.basename(file.originalname, ext), "-").concat(Date.now()).concat(ext));
    },
});
var upload = (0, multer_1.default)({ storage: storage });
var port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
exports.clients = {};
app.get("/", function (req, res) {
    res.send("Servidor TypeScript no ar! 🚀");
});
app.get("/events", function (req, res) {
    var jobID = req.query.jobID;
    // Configurando SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    exports.clients[jobID] = res;
    req.on("close", function () {
        delete exports.clients[jobID];
    });
});
function fileProcessor(filePath, jobID) {
    return __awaiter(this, void 0, void 0, function () {
        var client, readStrem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!exports.clients[jobID]) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 50); })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2:
                    client = exports.clients[jobID];
                    if (!client || !filePath)
                        return [2 /*return*/, client.status(505).json({ message: 'error' })];
                    readStrem = fs_1.default.createReadStream(filePath);
                    readStrem
                        .pipe((0, csv_parser_1.default)())
                        .on("data", function (row) {
                        client.write("event: getting\ndata: ".concat(JSON.stringify(row), "\n\n"));
                    })
                        .on("end", function () {
                        client.write("event: done\ndata: Concluido\n\n");
                        client.end();
                        // fs.unlinkSync(filePath); // Remover arquivo após leitura
                    })
                        .on("error", function (err) {
                        client.write("event: error\ndata: ".concat(err.message, "\n\n"));
                        client.end();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Rota que recebe arquivo
app.post("/upload", upload.single("file"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, jobID;
    var _a;
    return __generator(this, function (_b) {
        filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        jobID = (0, uid_1.uid)();
        if (!jobID)
            return [2 /*return*/, res.json({
                    message: "Error ao criar ID de processamente",
                    status: "error",
                })];
        if (!filePath)
            return [2 /*return*/, res.json({
                    message: "Error ao obter caminho no arquivo",
                    status: "error",
                })];
        res.json({
            message: "Processamento iniciado",
            status: "processing",
            jobID: jobID,
        });
        process.nextTick(function () { return fileProcessor(filePath, jobID); });
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("Servidor rodando em http://localhost:".concat(port));
});
