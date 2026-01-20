// import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import { fetchNotes } from '@/lib/api';
// import NotesClient from './Notes.client';

// export default async function FilterPage({ params }: { params: Promise<{ slug: string[] }> }) {
//   const { slug } = await params;
//   const tag = slug[0] || 'all';
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['notes', tag, '', 1],
//     queryFn: () => fetchNotes({ tag, search: '', page: 1, perPage: 6 }),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NotesClient tag={tag} />
//     </HydrationBoundary>
//   );
// }

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function FilterPage({ params }: Props) {
  const { slug } = await params; // ✅ ВАЖЛИВО
  const tag = slug?.[0] ?? 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () =>
      fetchNotes({
        tag,
        search: '',
        page: 1,
        perPage: 6,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
