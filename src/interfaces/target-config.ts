export interface TargetConfig {
  'add-x': number;
  'add-y': number;
  allowed_colors: string[];
  default_prio: number;
  width: number;
  height: number;
  ignored_colors: string[];
  structure: Structure[];
}

export interface Structure {
  file: string;
  name: string;
  priority: number;
  startx: number;
  starty: number;

  selected?: boolean;
}