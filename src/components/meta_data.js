import Head from 'next/head';


const meta_data = () => {
    return (
        <Head>
            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:image" content={post.imageUrl} />
            <meta property="og:url" content={`https://example.com/posts/${post.id}`} />
            <meta property="og:type" content="article" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.excerpt} />
            <meta name="twitter:image" content={post.imageUrl} />
        </Head>
    );
}

export default meta_data

// Simulate fetching data (replace with actual data fetching logic)
export async function getStaticProps() {
    const post = {
        id: 1,
        title: 'My Awesome Post',
        excerpt: 'This is a short description of the post.',
        content: 'Here’s the full content of the post.',
        imageUrl: 'https://example.com/post-image.jpg',
    };

    return { props: { post } };
}
