import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Layout from "@/components/Layout"
import matter from 'gray-matter'
import Post from '@/components/Post'
import CategoryList from '@/components/CategoryList'
import {getPosts} from '@/lib/posts'
import Pagination from '@/components/Pagination'

export default function Category({ posts, categoryName, categories }) {

  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5 font-bold'>
            Posts in {categoryName}
          </h1>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

        </div>

        <div className='w-1/4'>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts')) 
  const categories = files.map((filename) => {
 
    const markDownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontmatter } = matter(markDownWithMeta)
    return frontmatter.category.toLowerCase()
  })


  const paths = categories.map((category) => ({
    params: {category_name: category}
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { category_name } }) {

  const files = fs.readdirSync(path.join('posts'))

  const posts = getPosts()
   // GET CATS SIDEBAR 
   const categories = posts.map((post) => {
    return post.frontmatter.category
  })
  const uniqueCategories = [...new Set(categories)]
 
  // FILTER BY CAT 
  const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name)

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories
    }
  }
}
