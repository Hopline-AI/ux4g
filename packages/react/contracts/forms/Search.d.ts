import * as React from "react";

/** UX4G Search — pill search field with leading icon, clear button and Enter-to-search. */
export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  size?: "default" | "large";
}

export declare function Search(props: SearchProps): JSX.Element;
export default Search;
