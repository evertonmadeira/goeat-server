const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Token não informado' });

  const parts = authHeader.split(' ');

  if (!parts.length == 2)
    return res.status(401).send({ error: 'Erro no token' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token mal formatado' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: 'Token inválido' })

    req.userId = decoded.id;
    req.adminId = decoded.id;
    req.tableId = decoded.id;
    return next();
  })
}