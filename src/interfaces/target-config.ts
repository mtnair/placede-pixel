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
  name: string;
  file: string;
  startx: number;
  starty: number;
  priority: number;
  overlay_only?: boolean
  disabled?: boolean

  selected?: boolean;
}