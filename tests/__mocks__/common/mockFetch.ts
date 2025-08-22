export function mockFetchAndGiveThisResultOnce(mockResult: any) {
  return vi.spyOn(window, "fetch").mockImplementationOnce(() => {
    return Promise.resolve({ json: () => Promise.resolve(mockResult) } as Response);
  });
}
