export default function Picture({
  base,
  widths,
  sizes,
  srcWidth,
  width,
  height,
  alt,
  className,
  loading = 'lazy',
  fetchPriority
}) {
  const srcSet = (extension) => widths.map((item) => `${base}-${item}.${extension} ${item}w`).join(', ');

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        className={className}
        src={`${base}-${srcWidth}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
