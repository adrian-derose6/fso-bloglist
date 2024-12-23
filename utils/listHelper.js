const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const reducer = (max, blog) => {
    return blog.likes > max.likes ? blog : max
  }

  const favorite = blogs.reduce(reducer, blogs[0]);

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let blogCounts = {}
  
  blogs.forEach((blog) => {
    blogCounts[blog.author] = (blogCounts[blog.author] + 1) || 1
  })

  const maxAuthor = Object.keys(blogCounts).reduce((maxAuthor, currentAuthor) => {
    return blogCounts[currentAuthor] > blogCounts[maxAuthor] ? currentAuthor : maxAuthor
  })

  return {
    author: maxAuthor,
    blogs: blogCounts[maxAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let likeCounts = {}

  blogs.forEach((blog) => {
    likeCounts[blog.author] = (likeCounts[blog.author] + blog.likes) || blog.likes
  })

  const maxAuthor = Object.keys(likeCounts).reduce((maxAuthor, currentAuthor) => {
    return likeCounts[currentAuthor] > likeCounts[maxAuthor] ? currentAuthor : maxAuthor
  })

  return {
    author: maxAuthor,
    likes: likeCounts[maxAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}