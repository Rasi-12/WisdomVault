import { useMutation, useQuery } from "@tanstack/react-query";
import { dummyKnowledgeEntries } from "../data/knowledgeData";
import { useActor } from "./useActor";

export function useGetAllKnowledgeEntries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["knowledgeEntries"],
    queryFn: async () => {
      if (!actor) return dummyKnowledgeEntries;
      const results = await actor.getAllKnowledgeEntries();
      return results.length > 0 ? results : dummyKnowledgeEntries;
    },
    initialData: dummyKnowledgeEntries,
    enabled: !!actor && !isFetching,
  });
}

export function useSearchKnowledgeEntries(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["knowledgeSearch", keyword],
    queryFn: async () => {
      if (!actor || !keyword.trim()) return dummyKnowledgeEntries;
      const results = await actor.searchKnowledgeEntriesByKeyword(keyword);
      return results.length > 0 ? results : dummyKnowledgeEntries;
    },
    initialData: dummyKnowledgeEntries,
    enabled: !!actor && !isFetching && keyword.trim().length > 0,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      emailOrPhone,
      message,
    }: {
      name: string;
      emailOrPhone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      await actor.submitContactForm(name, emailOrPhone, message);
    },
  });
}

export function useSubmitContribution() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      contributorName: string;
      age: bigint;
      region: string;
      language: string;
      transcription: string;
      category: string;
      recordingType: string;
    }) => {
      if (!actor) {
        // Simulate success for demo
        return `WV-2026-${String(Math.floor(Math.random() * 900000) + 100000).padStart(6, "0")}`;
      }
      return actor.submitContribution(
        params.contributorName,
        params.age,
        params.region,
        params.language,
        params.transcription,
        params.category,
        params.recordingType,
      );
    },
  });
}
