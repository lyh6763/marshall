export default function PlaceholderMedia({
  label,
  role,
  ratio = '1 / 1',
  className = ''
}) {
  return (
    <div
      className={`placeholder_media ${className}`.trim()}
      style={{ '--placeholder-ratio': ratio }}
      role="img"
      aria-label={`${label} ${role} 임시 이미지 영역`}
    >
      <span>{label}</span>
      <strong>{role}</strong>
      <em>{ratio}</em>
    </div>
  );
}
