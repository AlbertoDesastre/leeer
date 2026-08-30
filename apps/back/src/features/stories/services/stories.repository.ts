export type StoryRecord = {
  id: string;
  title: string;
  createdAt: Date;
};

export class InMemoryStoryRepository {
  private readonly items: StoryRecord[] = [
    {
      id: "4b330eed-c720-437a-8643-c67e36d52476",
      title: "La primera historia",
      createdAt: new Date("2026-08-23T12:00:00.000Z"),
    },
  ];

  async list(): Promise<StoryRecord[]> {
    return [...this.items];
  }

  async create(story: StoryRecord): Promise<StoryRecord> {
    this.items.push(story);
    return story;
  }
}
