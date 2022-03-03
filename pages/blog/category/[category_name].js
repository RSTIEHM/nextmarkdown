import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Layout from "@/components/Layout"
import matter from 'gray-matter'
import Post from '@/components/Post'
import {getPosts} from '@/lib/posts'


export default function Category({ posts, categoryName }) {

  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Posts In {categoryName}</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => {
          return <Post key={index} post={post} />
        })}
      </div>
      <Link href="/blog">
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link>
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
 
  // FILTER BY CAT 
  const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name)

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name
    }
  }
}
