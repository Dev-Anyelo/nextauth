"use client";

import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const INTERVAL = 100;

const Search = ({ placeholder }: { placeholder: string }) => {
  
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (term) params.set("query", term);
    else params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }, INTERVAL);

  return (
    <div className="relative flex flex-1 flex-shrink-0 max-w-[700px]">
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray text-black focus:outline-none focus:border-gray-300"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default Search;
