const {faker} = require('@faker-js/faker');

// Generate mock data for the author model
const generateAuthorData = () => {
  const id = faker.datatype.uuid();
  const name = faker.name.fullName();
  const email = faker.internet.email();
  const phone_no = faker.phone.number();
  const password = faker.internet.password(15);
  const likedBooks = []
  return { id, name, email, phone_no, password, likedBooks };
};

// Generate mock data for the book model
const generateBookData = (authors) => {
  const id = faker.datatype.uuid();
  const title = faker.random.words(faker.datatype.number({ min: 1, max: 3 }));
  const likes = 0;
  const author = faker.helpers.arrayElement(authors).name
  return { id, title, likes, author };
};

// Generate mock data for both models
const generateMockData = (numAuthors, numBooksPerAuthor) => {
  const authors = Array.from({ length: numAuthors }, () => generateAuthorData());
  const books = [];
  authors.forEach(author => {
    for (let i = 0; i < numBooksPerAuthor; i++) {
      books.push(generateBookData([author]));
    }
  });
  return { authors, books };
};

// Generate 10 authors with 3 books each
const mockData = generateMockData(10, 3);

console.log(mockData)

module.exports = mockData
