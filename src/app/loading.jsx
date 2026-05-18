import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[90vh] w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-sm h-64 md:h-80 mx-auto">
        <Image
          src={"/animation/load.gif"}
          alt="loading gif"
          width={850}
          height={400}
          className="border-4 border-purple-600 rounded-2xl border-dashed"
        />
      </div>
      <p className="text-slate-500 font-medium animate-pulse mt-4">
        Arranging your shelf...
      </p>
    </div>
  );
}
