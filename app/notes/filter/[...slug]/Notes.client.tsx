'use client';

import css from './Notes.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoResult from '@/components/NoResult/NoResult';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import { NoteTag } from '@/types/note';

interface Props {
  tag?: NoteTag;
}

export default function Notes({ tag }: Props) {
  // State
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const perPage = 12;

  // Query
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const { data, isLoading, isError, isFetching, isSuccess } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes({ search: searchQuery, page: currentPage, perPage, tag }),
    placeholderData: keepPreviousData,
  });
  const handleCreateNote = () => {
    setCurrentPage(1);
  };

 
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          textInput={searchInput}
          onSearch={value => {
            setSearchInput(value);
            debouncedSearch(value);
          }}
        />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => setModalOpen(true)}
          disabled={isLoading || isFetching}
        >
          Create note +
        </button>
      </div>
      {!isLoading && !isError && data?.notes.length === 0 && <NoResult />}
      {isSuccess && data?.notes?.length > 0 && <NoteList notes={data.notes} />}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm
            onSuccess={handleCreateNote}
            onCancel={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
