// Typescript ya no permite los enums desde la versión 5.8: https://www.totaltypescript.com/erasable-syntax-only
export const COLLABORATION_TYPE = {
  FANFICTION: "Fanfiction",
  CANON: "Canon",
  SPINOFF: "Spinoff",
} as const;

export type CollaborationType = (typeof COLLABORATION_TYPE)[keyof typeof COLLABORATION_TYPE];

export interface SendCollaborationDto {
  creation_id: string;
  collaboration: CollaborationType;
}

export interface SendCollaborationRequestBody {
  is_fanfiction: boolean;
  is_spin_off: boolean;
  is_canon: boolean;
}

export type GetCreationCollaborationResponseDto = {
  creation_collaboration_id: string;
  approved_by_original_author: boolean | null;
  is_fanfiction: boolean;
  is_spin_off: boolean;
  is_canon: boolean;
  creation_date: string; // ISO date string
  modification_date: string; // ISO date string
  creation: {
    author_id: string;
    creation_id: string;
    title: string;
    synopsis: string;
    thumbnail: string;
  };
  collaborator: {
    user_id: string;
    nickname: string;
    profile_picture: string;
  };
};

export interface SuccessGetCreationCollaboration {
  success: boolean;
  data: GetCreationCollaborationResponseDto;
}
