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
