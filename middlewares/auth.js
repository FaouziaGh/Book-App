require('dotenv').config();
const jwt = require('jsonwebtoken');
//const User = require('../models/user');

const auth = (req, res, next) => {
    
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Unauthorized' });
    req.user = decoded;
    next();
  });
  };


module.exports = auth;








/* try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);      
    const userId = decodedToken.userId;
    //const user = await User.findOne({ userId});
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else{      
      
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  } */

      /* const user = await User.findOne({ _id: decodedToken.userId, 'tokens.token': token });
  
      if (!user) {
        throw new Error();
      }
  
      req.token = token;
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send({ error: 'Not authorized to access this resource' });
    } */