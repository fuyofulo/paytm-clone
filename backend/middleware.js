const { JWT_SECRET } = require("./config");



const authMiddleware = (req, res, next) => {

    const authHeader = req.header.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(411).json({})
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
    } catch (err) {
        res.status(403).json({})
    }
}


module.exports = { authMiddleware }