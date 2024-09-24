export default function Progress({ value }: { value: number }) {
  return (
    <div
      className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="flex flex-col justify-center rounded-full overflow-hidden bg-[#7e72ff] text-xs text-white text-center whitespace-nowrap transition-all duration-500"
        style={{ width: `${value}%` }}
      >
        {value}%
      </div>
    </div>
  );
}
