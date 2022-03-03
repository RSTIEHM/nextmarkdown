
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Layout from "../../../components/Layout"
import Header from "../../../components/Header"
import Post from '../../../components/Post'
import matter from 'gray-matter'
import { sortByDate } from '../../../utils'


export default function BlogPage({ posts }) {

  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => {
          return <Post key={index} post={post} />
        })}
      </div>

    </Layout>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markDownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontmatter } = matter(markDownWithMeta)
    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}
