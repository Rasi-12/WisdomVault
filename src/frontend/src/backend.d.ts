import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface KnowledgeEntry {
    id: string;
    region: string;
    title: string;
    verified: boolean;
    description: string;
    audioUrl: string;
    language: string;
    transcription: string;
    category: string;
    contributorAge: bigint;
}
export type Time = bigint;
export interface ContributionSubmission {
    id: string;
    age: bigint;
    region: string;
    contributorName: string;
    status: string;
    recordingType: string;
    submittedAt: Time;
    language: string;
    transcription: string;
    category: string;
}
export type SubmissionFilter = {
    __kind__: "region";
    region: string;
} | {
    __kind__: "contributorName";
    contributorName: string;
} | {
    __kind__: "status";
    status: string;
} | {
    __kind__: "language";
    language: string;
} | {
    __kind__: "category";
    category: string;
};
export interface backendInterface {
    filterContributions(filter: SubmissionFilter): Promise<Array<ContributionSubmission>>;
    getAllKnowledgeEntries(): Promise<Array<KnowledgeEntry>>;
    getContributionById(id: string): Promise<ContributionSubmission>;
    getKnowledgeEntriesByCategory(category: string): Promise<Array<KnowledgeEntry>>;
    getKnowledgeEntryById(id: string): Promise<KnowledgeEntry>;
    searchKnowledgeEntriesByKeyword(keyword: string): Promise<Array<KnowledgeEntry>>;
    submitContactForm(name: string, emailOrPhone: string, message: string): Promise<void>;
    submitContribution(contributorName: string, age: bigint, region: string, language: string, transcription: string, category: string, recordingType: string): Promise<string>;
}
