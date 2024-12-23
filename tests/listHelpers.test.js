const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/listHelper')
const blogsList = require('./blogs')

const emptyList = []
const manyBlogsList = blogsList;
const oneBlogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList);
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlogList)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(manyBlogsList)
    assert.strictEqual(result, 36)
  })

})

describe('favorite blog', () => {

  test('of empty list is {}', () => {
    const result = listHelper.favoriteBlog(emptyList)
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(oneBlogList)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list returns correct blog', () => {
    const result = listHelper.favoriteBlog(manyBlogsList)
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs', () => {

  test('of empty list is {}', () => {
    const result = listHelper.mostBlogs(emptyList)
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostBlogs(oneBlogList)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a bigger list returns correct author', () => {
    const result = listHelper.mostBlogs(manyBlogsList)
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {

  test('of empty list is {}', () => {
    const result = listHelper.mostLikes(emptyList)
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostLikes(oneBlogList)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list returns correct author', () => {
    const result = listHelper.mostLikes(manyBlogsList)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})