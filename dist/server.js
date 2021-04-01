"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
//comando para servir arquivos estaticos
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '..', 'uploads')));
app.listen(process.env.PORT || 3001, function () {
    console.log('> Server run at http://localhost:3001');
});
