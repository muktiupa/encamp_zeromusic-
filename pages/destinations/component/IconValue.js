export default function IconValue({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" stroke="#34cc9c" strokeWidth="4" fill="#f9fffd" />
      <path d="M24 32H40" stroke="#f4bc1c" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 24V40" stroke="#f4bc1c" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
