export function generateMetadata({
    title = "Next.js App",
    description = "Description",
    imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNDDaky4lvROb8utyqvD0en2KuVndJtZtjFQ&s",
    url = "https://main.d1ykkxg6efe5kj.amplifyapp.com/",
}) {

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: "Next.js App",
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: "Social Image Alt Text",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            image: imageUrl,
        },
    };
}
