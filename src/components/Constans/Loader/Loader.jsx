import { InfinitySpin } from "react-loader-spinner";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-200">
      <InfinitySpin color="blue" />
    </div>
  );
}
