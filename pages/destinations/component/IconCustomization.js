export default function IconCustomization({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" stroke="#34cc9c" strokeWidth="4" />
      <path d="M20 44L44 20" stroke="#34cc9c" strokeWidth="4" />
      <circle cx="24" cy="24" r="4" fill="#34cc9c" />
      <circle cx="40" cy="40" r="4" fill="#34cc9c" />
    </svg>
  );
}
