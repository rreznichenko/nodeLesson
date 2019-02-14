const mongodb = require('mongodb');

const MongoClient =  mongodb.MongoClient;

const mongoPass = '235387'

const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb://ray:${mongoPass}@max-shard-00-00-zj1v2.mongodb.net:27017,max-shard-00-01-zj1v2.mongodb.net:27017,max-shard-00-02-zj1v2.mongodb.net:27017/test?ssl=true&replicaSet=max-shard-0&authSource=admin&retryWrites=true`)
    .then(client => {
        console.log('connected');
        callback(client);
    })
    .catch(err => {
        console.log(err)
    }) 
}

module.exports = mongoConnect