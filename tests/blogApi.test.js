const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')

const Blog = require('../models/blog')
const { nonExistingId, initialBlogs, blogsInDb } = require('./testHelper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = initialBlogs.map(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
  await Promise.all(blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const allBlogs = await blogsInDb()

  assert.strictEqual(allBlogs.length, initialBlogs.length)
})

test('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(e => e.title)
  assert.strictEqual(title.includes('React patterns'), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Introduction to JavaScript Development",
    author: "Adrian DeRose",
    url: "https://javascriptdev.com/",
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(r => r.title)
  assert(titles.includes('Introduction to JavaScript Development'))
})

test('blog without a title is not added', async () => {
  const newBlog = {
    author: "Adrian DeRose",
    url: "https://javascriptdev.com/",
    likes: 10,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await blogsInDb()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a note can be deleted', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()

  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
})


after(async () => {
  await mongoose.connection.close()
})