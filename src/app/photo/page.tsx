import { getRequestContext } from "@cloudflare/next-on-pages";
import Link from "next/link";

export const runtime = "edge";

const List = async () => {
  const r2 = getRequestContext().env.MY_BUCKET;
  const data = await r2.list();

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">List</h1>
      <ul className="space-y-2">
        {data.objects.map((object) => (
          <li key={object.key} className="flex items-center space-x-2">
            <Link
              href={`/photo/preview?name=${object.key}`}
              className="text-blue-500 underline"
            >
              {object.key}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
