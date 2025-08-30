export interface Location {
  id: number;
  name: string;
  area: string;
  type?: "current" | "search" | "recent";
}

export interface SearchResult {
  id: string;
  name: string;
  location: string;
}
export interface SearchBody{
  name:string;
  location:string;
}

export interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}