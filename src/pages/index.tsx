import { GetStaticProps } from 'next';
import Link from 'next/link';

import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
// import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

function formatPosts(apiSearchResponse: ApiSearchResponse): Post[] {
  const results: Post[] = apiSearchResponse.results.map(post => {
    return {
      uid: post.uid,

      // banner: post.data.banner,
      // content: post.data,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
  // console.log(JSON.stringify(apiSearchResponse, null, 2), results);
  return results;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  // const [carregarPosts, setCarregarPosts] = useState(false);

  async function handleLoadPost(url: string): Promise<void> {
    const result = await fetch(url);
    const json: ApiSearchResponse = await result.json();

    setPosts([...posts, ...formatPosts(json)]);
  }

  return (
    <>
      <Header />
      <main className={commonStyles.pageContainer}>
        <section className={styles.articleContainer}>
          {posts.map(post => (
            <article key={post.uid}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <h2>{post.data.title}</h2>
                </a>
              </Link>

              <p>{post.data.subtitle}</p>
              <footer>
                <FiCalendar className="icon" />
                <time>
                  {format(
                    new Date(post.first_publication_date),
                    'dd LLL yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
                <FiUser className=".icon" />
                <span>{post.data.author}</span>
              </footer>
            </article>
          ))}

          {postsPagination.next_page ? (
            <button
              type="button"
              onClick={() => handleLoadPost(postsPagination.next_page)}
            >
              Carregar mais posts
            </button>
          ) : null}
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: [
        'posts.title',
        'posts.subtitle',
        // 'posts.uid',
        // 'posts.banner',
        'posts.author',
      ],
      pageSize: 1,
    }
  );

  const posts = formatPosts(postsResponse);

  return {
    props: {
      postsPagination: {
        results: posts,
        next_page: postsResponse.next_page,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};
