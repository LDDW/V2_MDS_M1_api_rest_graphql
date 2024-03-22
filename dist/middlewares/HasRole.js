"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = void 0;
function hasRole(role) {
    return (req, res, next) => {
        let roleFound = false;
        role.forEach((role) => {
            if (req.user.role === role) {
                roleFound = true;
                return next();
            }
        });
        if (!roleFound) {
            return res.status(403).json({ error: "Forbidden" });
        }
    };
}
exports.hasRole = hasRole;
