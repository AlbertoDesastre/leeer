import { vi } from "vitest";
import { ref } from "vue";

export const mockError = ref({ message: "", error: "", statusCode: 0 });
export const mockSendCollaboration = vi.fn();

export const mockUseCollaborations = {
  error: mockError,
  success: ref(false),
  isLoading: ref(false),
  sendCollaboration: mockSendCollaboration,
};

export const mockRouter = { push: vi.fn(), replace: vi.fn(), go: vi.fn() };
export const mockRoute = { name: "", params: { id: "magic-id-123" } };

vi.mock("vue-router", () => ({
  useRouter: () => mockRouter,
  useRoute: () => mockRoute,
}));

vi.mock("../../../src/modules/collaborations/composables/useCollaboration", () => ({
  useCollaborations: () => mockUseCollaborations,
}));
