

function Button({
  size = 'h-5 w-10 text-sm',
  color = "bg-blue-500",
  onClick,
  children,
  disabled=false,
}) {
  return (
    <button
      className={`${color} ${size} rounded-md`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
