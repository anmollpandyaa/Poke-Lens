export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-3">
       {message}
    </div>
  );
}
