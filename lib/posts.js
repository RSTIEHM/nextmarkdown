import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'

const files = fs.readdirSync(path.join('posts'))


export function getPosts() {
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markDownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontmatter } = matter(markDownWithMeta)
    return {
      slug,
      frontmatter
    }
  })

  return posts.sort(sortByDate)
}
