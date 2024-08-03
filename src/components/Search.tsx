import { useState } from "react";

const Search = ({ setSearch }: { setSearch: (value: string) => void }) => {
  const [input, setInput] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearch(input);
      }}
    >
      <input
        className="w-full p-2 placeholder:text-center outline-none rounded-md"
        placeholder="Search"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default Search;
