import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const Preview = async ({
  searchParams,
}: {
  searchParams: { name?: string };
}) => {
  if (!searchParams.name) return notFound();

  const r2 = getRequestContext().env.MY_BUCKET;
  const photo = await r2.get(searchParams.name);
  if (!photo) return notFound();

  const buffer = await photo.arrayBuffer();

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Preview</h1>
      <div className="relative w-fit">
        <img
          src={`data:image/png;base64,${Buffer.from(buffer).toString("base64")}`}
          alt=""
          className="object-cover rounded-lg shadow-xl w-auto"
        />
        <span className="absolute bottom-1 right-1 bg-gray-500 opacity-50 text-white text-xs px-1 rounded">
          {Math.round(buffer.byteLength / 1024)} KB
        </span>
      </div>
    </div>
  );
};

export default Preview;
