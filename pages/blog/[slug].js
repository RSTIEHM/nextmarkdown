import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PostPage = ({ frontmatter, content, slug }) => {

  const { title, category, date, cover_image, author, author_image } = frontmatter
  console.log(title, category, date, cover_image, author, author_image)
  return (
    <div>{title}</div>
  )
}

export default PostPage


export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  console.log(paths)

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markDownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markDownWithMeta)
  return {
    props: {
      frontmatter,
      content,
      slug
    }
  }
}