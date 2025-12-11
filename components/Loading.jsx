"use client";

export default function Loading({ small }) {
  const size = small ? "w-8 h-8" : "w-16 h-16";

  return (
    <div className="flex justify-center py-5">
      <div className={`relative ${size} animate-spin`}>
        <div className={`absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full border border-white`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border border-black`}></div>
        <div className="absolute inset-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
}
