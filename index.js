const express = require('express');
const mongoose = require('mongoose');

const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');
const app = express();
const PORT = 5000;

mongoose.connect("mongodb+srv://agrim:testpassword@cluster0.yfybk.mongodb.net/BootcampDatabase?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.connection.once('open', ()=>{
    console.log('Connected to Database.');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`);
});