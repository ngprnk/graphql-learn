import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema/schema';
import config from './config';

const app = express();


/* mongodb database connection */
mongoose.connect(config.mongoURL);
mongoose.connection.once('open', () => {
  console.log('Connected to Database Awesome');
});


app.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }));

app.listen(4000, () => {
  console.log(' This app is now running on port 4000');
});
