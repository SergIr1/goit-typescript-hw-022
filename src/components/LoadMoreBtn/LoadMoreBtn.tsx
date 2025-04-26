import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  page: number;
  onPage: (value: number) => void;
}

export default function LoadMoreBtn({ page, onPage }: LoadMoreBtnProps) {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={() => onPage(page + 1)}>
        Load more
      </button>
    </div>
  );
}
