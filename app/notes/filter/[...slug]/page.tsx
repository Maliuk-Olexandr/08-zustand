import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug?.[0] === 'All' ? undefined : (slug?.[0] as NoteTag) || "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, perPage: 12, tag }],
    queryFn: () => fetchNotes({ search: "", page: 1, perPage: 12, tag }),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes tag={tag} />
      </HydrationBoundary>
      
    </div>
  );
}