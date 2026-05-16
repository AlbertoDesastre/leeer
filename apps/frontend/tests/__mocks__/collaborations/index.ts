import { vi } from "vitest";
import { ref } from "vue";

export const mockError = ref({ message: "", error: "", statusCode: 0 });
export const mockSendCollaboration = vi.fn();

const useCollaborationsMock = {
  error: mockError,
  success: ref(false),
  isLoading: ref(false),
  sendCollaboration: mockSendCollaboration,
};

vi.mock("../../../src/modules/collaborations/composables/useCollaboration", () => ({
  useCollaborations: () => useCollaborationsMock,
}));
