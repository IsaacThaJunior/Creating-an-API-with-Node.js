class APIFeatures {
  constructor(queryFromMongoDB, queryStringFromExpress) {
    this.queryFromMongoDB = queryFromMongoDB;
    this.queryStringFromExpress = queryStringFromExpress;
  }

  filter() {
    const queryObj = { ...this.queryStringFromExpress };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);

    // 1b) Creating advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.queryFromMongoDB = this.queryFromMongoDB.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryStringFromExpress.sort) {
      const sortBy = this.queryStringFromExpress.sort.split(',').join(' ');
      this.queryFromMongoDB = this.queryFromMongoDB.sort(sortBy);
    } else {
      this.queryFromMongoDB = this.queryFromMongoDB.sort('-createdAt');
    }

    return this;
  }

  limitingFields() {
    if (this.queryStringFromExpress.fields) {
      const fields = this.queryStringFromExpress.fields.split(',').join(' ');
      this.queryFromMongoDB = this.queryFromMongoDB.select(fields);
    } else {
      this.queryFromMongoDB = this.queryFromMongoDB.select('-__v');
    }

    return this;
  }

  pagination() {
    const page = this.queryStringFromExpress.page * 1 || 1;
    const limit = this.queryStringFromExpress.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.queryFromMongoDB = this.queryFromMongoDB.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
