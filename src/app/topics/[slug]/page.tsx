import PostsCreateForm from "@/components/posts/PostsCreateForm";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl fold-bold mb-2">{slug}</h1>
      </div>

        <div>
            <PostsCreateForm slug={slug} />
        </div>
    </div>
  );
}
