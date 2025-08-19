import s from './style.module.scss';

export default function ImageSkeleton() {
  return (
    <div className={s.skeleton}>
      <div className={s.shimmer}></div>
    </div>
  );
}