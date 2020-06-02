const {MongoClient} = require('mongodb');

describe('retrieve', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db('Reviews');
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should retrieve the correct product from reviews', async () => {
    const Review = db.collection('reviews');
    const product = await Review.findOne({product_id: 2});
    expect(product.review_id).toEqual(3);
  });

  it('should retrieve the correct number of products from reviews', async () => {
    const Review = db.collection('reviews');
    const products = await Review.find({product_id: 1252 }).toArray();
    expect(products.length).toEqual(9);
  });

  it('should NOT retrieve the products when no products are present', async () => {
    const Review = db.collection('reviews');
    const products = await Review.findOne({product_id: 3 });
    expect(products).toEqual(null);
  });
});