import { redirect } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const upload = async (formData: FormData) => {
  "use server";
  const photo = formData.get("photo") as File;
  const r2 = getRequestContext().env.MY_BUCKET;

  await r2.put(photo.name, photo);

  return redirect(`/photo/preview?name=${photo.name}`);
};

const Form = () => {
  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Upload</h1>
      <form
        action={upload}
        className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
      >
        <input type="file" name="photo" required accept="image/*" />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Form;
