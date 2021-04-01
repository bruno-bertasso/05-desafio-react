import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Document as PrismicDocument } from '@prismicio/client/types/documents';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;

  data: {
    title: string;
    subtitle: string;
    content: { heading: string; body: any }[];
    banner: { url: string };
    author: string;
  };
}

interface PostsProps {
  post: Post;
}

function formatPost(document: PrismicDocument): Post {
  const result: Post = {
    uid: document.uid,

    // content: post.data,
    first_publication_date: document.first_publication_date,
    data: {
      banner: document.data.banner,
      title: document.data.title,
      content: document.data.content,
      subtitle: document.data.subtitle,
      author: document.data.author,
    },
  };

  return result;
}

export default function Posts({ post }: PostsProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }
  const content = post.data.content.map(item => ({
    heading: item.heading as string,
    body: RichText.asHtml(item.body),
  }));

  const readingTime = post.data.content.reduce((acc, section) => {
    const headingWords = section.heading.split(/\b\S+\b/g).length;
    const contentWords = RichText.asText(section.body).split(/\s+/g).length;
    const time = Math.ceil((headingWords + contentWords) / 200);
    return acc + time;
  }, 0);

  return (
    <>
      <Header />
      <section
        className={styles.banner}
        style={{
          backgroundImage: `url("${post.data.banner.url}")`,
          width: '100%',
          height: '400px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <main className={commonStyles.pageContainer}>
        <section className={styles.postHeader}>
          <h1>{post.data.title}</h1>
          <footer>
            <FiCalendar className="icon" />
            <time>
              {format(new Date(post.first_publication_date), 'dd LLL yyyy', {
                locale: ptBR,
              })}
            </time>
            <FiUser className=".icon" />
            <span>{post.data.author}</span>
            <FiClock className=".icon" />
            <span>{readingTime} min</span>
          </footer>
        </section>
        <section className={styles.postContent}>
          {content.map(item => (
            <section key={item.heading}>
              <h2>{item.heading}</h2>
              <section
                dangerouslySetInnerHTML={{
                  __html: item.body,
                }}
              />
            </section>
          ))}
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'como-utilizar-hooks',
        },
      },
      {
        params: {
          slug: 'criando-um-app-cra-do-zero',
        },
      },
    ],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;

  const postResponse: PrismicDocument = await prismic.getByUID(
    'posts',
    slug as string,
    {
      fetch: [
        'posts.title',
        'posts.subtitle',
        'posts.content',
        'posts.banner',
        'posts.author',
      ],
      pageSize: 1,
    }
  );

  // console.log('response', JSON.stringify(postResponse, null, 2));
  // console.log('response', RichText.asHtml(postResponse.data.content[0]));
  const post = formatPost(postResponse);

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 24,
  };
};
