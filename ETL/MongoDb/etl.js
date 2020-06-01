const fs = require('fs');
const etl = require ('etl');
const db = require('../../database/MongoDB/index'); // make sure mongoose.connect is being exported for ELT

var characteristics = db.then(function(db) {
  return db.collection('characteristics');
});
var characteristic_reviews = db.then(function(db) {
  return db.collection('characteristic_reviews');
});
var reviews = db.then(function(db) {
  return db.collection('reviews');
});
var reviews_photos = db.then(function(db) {
  return db.collection('reviews_photos');
});

  fs.createReadStream('../data_files/reviews.csv')
  .pipe(etl.csv())
  .pipe(
    etl.map(function(d) {
      this.push({
        review_id: Number(d.id),
        product_id: Number(d.product_id),
        rating: Number(d.rating),
        date: d.date,
        summary: d.summary,
        body: d.body,
        recommend: d.recommend === 'true' ? 1 : 0,
        reported: d.reported === 'true' ? 1 : 0,
        reviewer_name: d.reviewer_name,
        reviewer_email: d.reviewer_email,
        response: d.response,
        helpfulness: Number(d.helpfulness)
      });
    })
  )
    // collect 1000 files at a time for bulk insert
    .pipe(etl.collect(1000))
    .pipe(etl.mongo.insert(reviews))
    .promise()
    .then(() => console.log('Complete'))
    .catch((e) => console.log('Error!', e)); 
    
    fs.createReadStream('./data_files/reviews_photos.csv')
    .pipe(etl.csv())
    .pipe(
      etl.map(function(d) {
        this.push({
          id: Number(d.id),
          review_id: Number(d.review_id),
          url: d.url
        });
      })
      )
      .pipe(etl.collect(1000))
      .pipe(etl.mongo.insert(reviews_photos))
      .promise()
      .then(() => console.log('Complete'))
      .catch((e) => console.log('Error!', e)); 
      
      fs.createReadStream('./data_files/characteristics.csv')
      .pipe(etl.csv())
      .pipe(
        etl.map(function(d) {
          this.push({
            id: Number(d.id),
            product_id: Number(d.product_id),
            name: d.name
          })
        })
        )
        .pipe(etl.collect(1000))
        .pipe(etl.mongo.insert(characteristics))
        .promise()
        .then(() => console.log('Complete'))
        .catch((e) => console.log('Error!', e)); 
        fs.createReadStream('./data_files/characteristic_reviews.csv')
        .pipe(etl.csv())
        .pipe(
          etl.map(function(d) {
            this.push({
              id: Number(d.id),
              characteristic_id: Number(d.characteristic_id),
              review_id: Number(d.review_id),
              value: Number(d.value)
            });
          })
          )
          .pipe(etl.collect(1000))
          .pipe(etl.mongo.insert(characteristic_reviews))
          .promise()
          .then(() => console.log('Complete'))
          .catch((e) => console.log('Error!', e));       