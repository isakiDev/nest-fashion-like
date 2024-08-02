"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcrypt_1 = require("bcrypt");
class BcryptAdapter {
    static hashSync(data, saltOrRounds) {
        return (0, bcrypt_1.hashSync)(data, saltOrRounds);
    }
    static compareSync(data, encrypted) {
        return (0, bcrypt_1.compareSync)(data, encrypted);
    }
}
exports.BcryptAdapter = BcryptAdapter;
//# sourceMappingURL=bcrypt.adapter.js.map