import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ page, onPage }) {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={() => onPage(page + 1)}>
        Load more
      </button>
    </div>
  );
}
