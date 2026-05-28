import { MDXRemote } from 'next-mdx-remote'
import { CodeBlock } from './code-block'
import { Note } from './note'
import Link from 'next/link'

const components = {
  code: CodeBlock,
  aside: Note,
  
  a: ({ href, children, ...props }) => {
    // If it's an external link (starts with http) or missing an href, render a standard <a> tag
    if (!href || href.startsWith('http')) {
      return <a href={href || '#'} {...props}>{children}</a>
    }

    // Only wrap internal markdown links with Next.js Link
    return (
      <Link href={href} legacyBehavior {...props}>
        <a {...props}>{children}</a>
      </Link>
    )
  },

  Link: ({ href, children, ...props }) => (
    <Link href={href || '#'} legacyBehavior {...props}>
      <a {...props}>{children}</a>
    </Link>
  )
}


// 2. YOUR LESSON COMPONENT REMAINS BELOW IT
export const Lesson = ({ lesson }) => {
  const content = <MDXRemote {...lesson.content} components={components} />

  let header = null
  if (lesson.type === 'lesson') {
    header = (
      <small className="block text-base mb-4">Lesson {lesson.number}</small>
    )
  } else if (lesson.type === 'sublesson') {
    header = (
      <small className="block text-base mb-4">
        Lesson {lesson.parent.number}.{' '}
        <span dangerouslySetInnerHTML={{ __html: lesson.parent.title }} />
      </small>
    )
  }

  let title
  if (lesson.type === 'sublesson') {
    title = (
      <>
        <span className="text-3xl mr-2">{lesson.number}.</span>{' '}
        <span dangerouslySetInnerHTML={{ __html: lesson.title }} />
      </>
    )
  } else {
    title = <span dangerouslySetInnerHTML={{ __html: lesson.title }} />
  }

  return (
    <article className="prose prose-pink max-w-none">
      <h1>
        {header}
        {title}
      </h1>
      {content}
    </article>
  )
}