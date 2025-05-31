import type { User } from "../../auth/types";

export type Creation = {
  creation_id: string;
  title: string;
  is_draft: boolean;
  synopsis: string;
  description: string | null;
  thumbnail: string | null;
  creation_date: string;
  modification_date: string;
  /* Puede haber alguna llamada en la que no haya usuario asociado. */
  user?: User;
};

export type Part = {
  part_id: string;
  title: string;
  content: string;
  word_count: number | null;
  reading_time: number | null;
  thumbnail: string | null;
  is_draft: boolean;
  creation_date: string;
  modification_date: string;
};
