/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { sign } = require('jsonwebtoken');

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
  },
  {
    methods: {
      async generateToken() {
        const user = this;
        // eslint-disable-next-line global-require
        const jwt = require('jsonwebtoken');

        try {
          const decodedUserFromToken = user.accessToken
            ? jwt.verify(user.accessToken, process.env.JWT_SECRET_KEY)
            : null;
          if (decodedUserFromToken) return user.accessToken;
        } catch (err) {
          // token expired, moving next to create new
          console.log(err);
        }

        const accessToken = await sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET_KEY,
          {
            // keeping 10 minute
            expiresIn: 1 * 60 * 10,
          }
        );
        user.accessToken = accessToken;
        await user.save();
        return accessToken;
      },
    },
    statics: {
      async findByEmailAndPassword({ email, password }) {
        const user = await this.findOne({ email });
        if (!user) return { notFound: true };
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) throw new Error('Incorrect credentials password');
        else return user;
      },
    },
  }
);

// middleware for hasing the password before save

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;
